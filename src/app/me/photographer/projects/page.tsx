"use client";

import type { Photo } from "types/photo.types";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";
import { ChooseComponent } from "@/components/dropdown/choose.component";
import { ModalComponent, useModal } from "@/components/modal/modal.component";

import getCategoriedPhotos from "@/api/photos.api";

import styles from "./page.module.css";
import { PATH } from "./page.constants";

const Page = () => {
  const router = useRouter();

  const [photos, setPhotos] = useState<Photo[]>();

  const [categories, setCategories] = useState<string[]>();
  const [specialCategories, setSpecialCategories] = useState<string[]>();

  const [selectedCategory, setSelectedCategory] = useState<string>("все");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);

  const { ModalComponent: Modal, setActived } = useModal({
    id: "gallery__choose_category",
  });

  const set = (data: {
    categories: string[];
    specialCategories: string[];
    photos: Photo[];
  }) => {
    setSpecialCategories(data.specialCategories);
    setCategories(data.categories);
    setPhotos(data.photos);
  };

  useEffect(() => {
    (async () => {
      set(await getCategoriedPhotos(selectedCategory));

      setLoaded(true);
    })();
  }, [selectedCategory]);

  if (!loaded) {
    return <>Загрузка...</>;
  }

  const isStatesNull = !categories || !specialCategories || !photos;
  if (isStatesNull) {
    return <>Произошла какая-то ошибка</>;
  }

  return (
    <div
      className="page-center"
      style={{ justifySelf: "normal", flexDirection: "column-reverse" }}
    >
      <CategoryComponent photos={photos} set={setSelectedPhoto} />
      <div style={{ display: "flex", gap: "0.75em" }}>
        <button onClick={() => setActived(true)}>
          Выбрать особую категорию
        </button>
        <Modal className={styles.modal}>
          {specialCategories.map((category) => (
            <button key={category} onClick={() => router.push(PATH + category)}>
              {category.slice(1)}
            </button>
          ))}
        </Modal>
        <ChooseComponent
          dropdown={{
            id: "photographer__projects__choose",
            className: styles.dropdown,
            summary: (
              <button>Выберите категорию (Сейчас: {selectedCategory})</button>
            ),
          }}
          onChange={async (index) => {
            const newCatergory = categories[index];

            set(await getCategoriedPhotos(newCatergory));
            setSelectedCategory(newCatergory);
          }}
          currentIndex={categories.indexOf(selectedCategory)}
          components={categories}
        />
      </div>

      <ModalComponent
        id="photographer__projects__selected_photo_modal"
        actived={selectedPhoto !== null}
        onClick={() => setSelectedPhoto(null)}
        html={{
          className: styles.modal,
        }}
      >
        <div className={styles.modal__selected_photo}>
          <button onClick={() => setSelectedPhoto(null)}>
            Вернуть к просмотру
          </button>
          <PhotoModal index={selectedPhoto as number} photos={photos} />
        </div>
      </ModalComponent>
    </div>
  );
};

export default Page;
