"use client";

import type { Photo } from "types/photo.types";

import { useState, useEffect } from "react";

import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";
import { ChooseComponent } from "@/components/dropdown/choose.component";

import getCategoriedPhotos from "@/api/photos.api";

import styles from "./page.module.css";

const Page = () => {
  const [photos, setPhotos] = useState<Photo[]>();
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { photos, categories } =
        await getCategoriedPhotos(selectedCategory);

      setCategories(categories);
      setPhotos(photos);
    })();
  }, []);

  if (!photos || !categories) {
    return <>Ждите</>;
  }

  return (
    <div
      className="page-center"
      style={{ justifySelf: "normal", flexDirection: "column-reverse" }}
    >
      <CategoryComponent photos={photos} set={setSelectedPhoto} />
      <ChooseComponent
        dropdown={{
          id: "photographer__projects__choose",
          className: styles.dropdown,
          summary: (
            <button>Выберите категорию (Сейчас: {selectedCategory})</button>
          ),
        }}
        onChange={(index) => setSelectedCategory(categories[index])}
        currentIndex={categories.indexOf(selectedCategory)}
        components={categories}
      />

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
