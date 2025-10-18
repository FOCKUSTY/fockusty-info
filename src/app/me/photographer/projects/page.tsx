"use client";

import type { Photo } from "types/photo.types";
import type { Dispatch, SetStateAction } from "react";

import { useState, useEffect } from "react";
import Image from "next/image";

import { useDropdown } from "@/components/dropdown";
import useMediaQuery from "@/hooks/media.hook";
import getCategoriedPhotos from "@/api/photos.api";

import styles from "./page.module.css";
import { CategoryComponent } from "@/components/photos/photo.component";
import { PhotoModal } from "@/components/photos/photo-modal.component";

const Page = () => {
  const [photos, setPhotos] = useState<Photo[]>();
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { Dropdown, setActived } = useDropdown({
    id: "photographer__projects__choose",
    className: styles.dropdown,
  });

  useEffect(() => {
    (async () => {
      const { photos, categories } = await getCategoriedPhotos(selectedCategory);
      
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
      <CategoryComponent
        photos={photos}
        set={setSelectedPhoto}
      />
      <Dropdown
        summary={
          <button>Выберите категорию (Сейчас: {selectedCategory})</button>
        }
      >
        {categories
          .filter((category) => category != selectedCategory)
          .map((category) => (
            <span
              key={"categorty_" + category}
              onClick={async () => {
                setSelectedCategory(category);
                setPhotos((await getCategoriedPhotos(category)).photos);
                setActived(false);
              }}
            >
              {category}
            </span>
        ))}
      </Dropdown>

      {selectedPhoto && (
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
            <PhotoModal photo={selectedPhoto} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
