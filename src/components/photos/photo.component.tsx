import type { Photo } from "@/types/photo.types";
import type {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from "react";

import { resolvePhoto } from "./resolve-photo";

import Image from "next/image";

import styles from "./photo.module.css";

type Props = {
  photos: Photo[];
  index: number;
  set: Dispatch<SetStateAction<number | null>>;
  html?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
};

export const PhotoComponent = ({ index, photos, set, html }: Props) => {
  const photo = photos[index];
  const { id, path } = resolvePhoto(photo);

  return (
    <div
      {...html}
      className={[html?.className, styles.card].join(" ")}
      key={id}
      onClick={() => set(index)}
    >
      <Image
        src={path}
        alt={photo.title}
        key={1 + id}
        width={300}
        height={200}
        className={styles.image}
        style={{
          objectPosition: photo.position,
        }}
      />
      <div className={styles.info} key={2 + id}>
        <h3>{photo.title}</h3>
        <p>
          {photo.location} • {photo.date}
        </p>
      </div>
    </div>
  );
};

export const CategoryComponent = ({
  photos,
  set,
  uniqueEnabled,
}: {
  photos: Photo[];
  set: Dispatch<SetStateAction<number | null>>;
  uniqueEnabled?: boolean;
}) => {
  return (
    <div className={styles.category}>
      {photos.map((photo, index) => {
        if (photo.unique && !uniqueEnabled) {
          return null;
        }

        return (
          <PhotoComponent key={index} photos={photos} index={index} set={set} />
        );
      })}
    </div>
  );
};
