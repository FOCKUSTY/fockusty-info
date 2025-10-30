import type { Photo } from "@/types/photo.types";

import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

import { resolvePhoto } from "./resolve-photo";

import useMediaQuery from "@/hooks/media.hook";
import Image from "next/image";

import styles from "./photo-modal.module.css";

type Props = {
  index: number;
  photos: Photo[];
  setNextPhoto: (position: 1 | -1) => unknown;
  setNewCategory: (index: number | string) => unknown;
};

type CategoriesProps = {
  photo: Photo;
} & Pick<Props, "setNewCategory">;

const Categories = ({ photo, setNewCategory }: CategoriesProps) => {
  return (
    <div className={styles.category}>
      {photo.categories.map((category) => (
        <span
          className={styles.category_name}
          key={category}
          onClick={() => setNewCategory(category)}
        >
          #{category.replaceAll("!", "")}
        </span>
      ))}
    </div>
  );
};

export const PhotoModal = ({ photos, index, setNextPhoto, setNewCategory }: Props) => {
  const photo = photos[index];
  const { id, path } = resolvePhoto(photo);
  const isLessThan = useMediaQuery("(max-width: 1000px)");

  return (
    <div key={id} className={styles.modal__photo}>
      <div style={{ position: "relative" }}>
        <Image
          src={path}
          alt={photo.title}
          width={isLessThan ? 600 : 1000}
          height={isLessThan ? 400 : 1000}
          className={styles.modal__photo_image}
          style={{
            objectPosition: photo.position,
          }}
        />
        <span className={styles.modal__photo_camera}>Камера: {photo.camera}</span>

        <div className={styles.modal__chevrons}>
          <BsChevronLeft
            className={styles.modal__chevron}
            size={24}
            onClick={() => setNextPhoto(-1)}
          />
          <BsChevronRight
            className={styles.modal__chevron}
            size={24}
            onClick={() => setNextPhoto(1)}
          />
        </div>
      </div>

      <div className={styles.modal___photo_info}>
        <h2>{photo.title}</h2>
        <Categories photo={photo} setNewCategory={setNewCategory} />
        <p>
          {photo.location} • {photo.date}
        </p>
        <p>{photo.description}</p>
      </div>
    </div>
  );
};
