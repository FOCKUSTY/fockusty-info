"use client";

import type { Photo } from "types/photo.types";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

import { PATH } from "./page.constants";

import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";
import { ModalComponent, useModal } from "@/components/modal/modal.component";
import { ChooseComponent } from "@/components/dropdown/choose.component";

import getCategoriedPhotos from "@/api/photos.api";

import styles from "./page.module.css";

type Props = {
  uniqueEnabled?: boolean;
  query: Promise<{ category?: string }>;
};

export const Gallery = ({ uniqueEnabled, query }: Props) => {
  const router = useRouter();

  const { category: queryCategory } = use(query);

  const { gallery: encodedGallery } = useParams<{ gallery?: string[] }>();
  const gallery = (
    encodedGallery ? decodeURIComponent(encodedGallery.join("/")) : queryCategory || "все"
  ).toLowerCase();

  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [specialCategories, setSpecialCategories] = useState<string[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(gallery);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const [loaded, setLoaded] = useState<boolean>(false);

  const { ModalComponent: Modal, setActived } = useModal({
    id: "gallery__choose_category",
  });

  const set = (data: { categories: string[]; specialCategories: string[]; photos: Photo[] }) => {
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

  const categoryExists = categories.includes(gallery) || specialCategories.includes(gallery);
  if (!categoryExists) {
    return <>Не было найдено такой категориии</>;
  }

  const setNewCategory = async (newCategory: number | string) => {
    if (typeof newCategory === "string") {
      if (specialCategories.includes(newCategory)) {
        return router.push(PATH + "/" + newCategory);
      }

      if (categories.includes(newCategory)) {
        return router.push(PATH + "?category=" + newCategory);
      }
    }

    const category: string =
      typeof newCategory === "string" ? newCategory : categories[newCategory];

    if (encodedGallery) {
      return router.push(PATH + "?category=" + category);
    }

    setSelectedPhoto(null);

    set(await getCategoriedPhotos(category));
    setSelectedCategory(category);
  };

  return (
    <div className="page-center" style={{ justifySelf: "normal", flexDirection: "column-reverse" }}>
      <CategoryComponent uniqueEnabled={uniqueEnabled} photos={photos} set={setSelectedPhoto} />
      <div style={{ display: "flex", gap: "0.75em" }}>
        <button onClick={() => setActived(true)}>Выбрать особую категорию</button>
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
            summary: <button>Выберите категорию</button>,
          }}
          onChange={setNewCategory}
          currentIndex={encodedGallery ? null : categories.indexOf(selectedCategory)}
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
          <button onClick={() => setSelectedPhoto(null)}>Вернуть к просмотру</button>
          <PhotoModal
            index={selectedPhoto as number}
            photos={photos}
            setNewCategory={setNewCategory}
            setNextPhoto={(position) =>
              setSelectedPhoto((previous) => {
                const current = previous || 0;
                const newPhotoIndex = current + position;

                if (newPhotoIndex > photos.length - 1) {
                  return 0;
                }

                if (newPhotoIndex < 0) {
                  return photos.length - 1 + newPhotoIndex;
                }

                return newPhotoIndex;
              })
            }
          />
        </div>
      </ModalComponent>
    </div>
  );
};
