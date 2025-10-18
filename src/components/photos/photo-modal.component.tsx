import type { Photo } from "@/types/photo.types";

import { resolvePhoto } from "./resolve-photo";

import useMediaQuery from "@/hooks/media.hook";
import Image from "next/image";

import styles from "./photo-modal.module.css";

type Props = {
  index: number;
  photos: Photo[];
}

export const PhotoModal = ({ photos, index }: Props) => {
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
        <span className={styles.modal__photo_camera}>
          Камера: {photo.camera}
        </span>
      </div>

      <div className={styles.modal___photo_info}>
        <h2>{photo.title}</h2>
        <p>
          {photo.location} • {photo.date}
        </p>
        <p>{photo.description}</p>
      </div>
    </div>
  );
};