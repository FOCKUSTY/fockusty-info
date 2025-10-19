"use client";

import type { Photo } from "types/photo.types";

import { useParams } from "next/navigation";

import { useState, useEffect } from "react";

import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";
import { ChooseComponent } from "@/components/dropdown/choose.component";

import getCategoriedPhotos from "@/api/photos.api";

import styles from "../page.module.css";

const Page = () => {
  const { gallery: encodedGallery } = useParams<{gallery: string[]}>();
  const gallery = decodeURIComponent(encodedGallery.join("/")).toLowerCase();

  const [photos, setPhotos] = useState<Photo[]>();
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setSelectedCategory(gallery);

      const { photos, categories } =
        await getCategoriedPhotos(gallery);

      setCategories(categories);
      setPhotos(photos);
    })();
  }, [gallery]);

  if (!photos || !categories) {
    return <>Ждите</>;
  }

  if (!categories.includes(gallery)) {
    return <>Не было найдено такой категориии</>
  }

  return (
    <div
      className="page-center"
      style={{ justifySelf: "normal", flexDirection: "column-reverse" }}
    >
      <CategoryComponent photos={photos} set={setSelectedPhoto} />
{/*       <ChooseComponent
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
      /> */}

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
