"use client";

import type { Photo } from "types/photo.types";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";
import { useModal } from "@/components/modal/modal.component";
import { ChooseComponent } from "@/components/dropdown/choose.component";

import getCategoriedPhotos from "@/api/photos.api";

import styles from "../page.module.css";
import { PATH } from "../page.constants";

const Page = () => {
  const router = useRouter();

  const { gallery: encodedGallery } = useParams<{ gallery: string[] }>();
  const gallery = decodeURIComponent(encodedGallery.join("/")).toLowerCase();

  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [specialCategories, setSpecialCategories] = useState<string[] | null>(
    null,
  );
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);

  const { ModalComponent, setActived } = useModal({
    id: "gallery__choose_category",
  });

  useEffect(() => {
    (async () => {
      const { photos, specialCategories, categories } =
        await getCategoriedPhotos(gallery);

      setSpecialCategories(specialCategories);
      setCategories(categories);
      setPhotos(photos);

      setLoaded(true);
    })();
  }, [gallery]);

  if (!loaded) {
    return <>Загрузка...</>;
  }

  const isStatesNull = !categories || !specialCategories || !photos;
  if (isStatesNull) {
    return <>Произошла какая-то ошибка</>;
  }

  const isSpecialCategory = gallery.startsWith("!");
  const specialCategoryExists =
    !isSpecialCategory || specialCategories.includes(gallery);
  if (!specialCategoryExists) {
    return <>Не было найдено такой категориии</>;
  }

  return (
    <div
      className="page-center"
      style={{ justifySelf: "normal", flexDirection: "column-reverse" }}
    >
      <CategoryComponent uniqueEnabled photos={photos} set={setSelectedPhoto} />
      <div style={{ display: "flex", gap: "0.75em" }}>
        <button onClick={() => setActived(true)}>
          Выбрать особую категорию
        </button>
        <ModalComponent className={styles.modal}>
          {specialCategories.map((category) => (
            <button key={category} onClick={() => router.push(PATH + category)}>
              {category.slice(1)}
            </button>
          ))}
        </ModalComponent>
        <ChooseComponent
          dropdown={{
            id: "photographer__projects__choose",
            className: styles.dropdown,
            summary: <button>Выберите категорию</button>,
          }}
          onChange={() => router.push(PATH)}
          currentIndex={0}
          components={categories}
        />
      </div>

      {selectedPhoto !== null && (
        <div
          id="photographer__projects__selected_photo_modal"
          className={styles.modal}
          onClick={(e) => {
            if (
              (e.target as HTMLElement).id !==
              "photographer__projects__selected_photo_modal"
            ) {
              return;
            }

            setSelectedPhoto(null);
          }}
        >
          <div className={styles.modal__selected_photo}>
            <button onClick={() => setSelectedPhoto(null)}>
              Вернуть к просмотру
            </button>
            <PhotoModal index={selectedPhoto} photos={photos} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
