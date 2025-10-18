import type { Photo } from "@/types/photo.types";
import type { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";

import { resolvePhoto } from "./resolve-photo";

import Image from "next/image";

import styles from "./photo.module.css";

type Props = {
  photo: Photo;
  set: Dispatch<SetStateAction<Photo | null>>;
  html?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
}

export const PhotoComponent = (props: Props) => {
  const { id, path } = resolvePhoto(props.photo);

  return (
    <div
      {...props.html}
      className={[
        props.html?.className,
        styles.card
      ].join(" ")}
      key={id}
      onClick={() => props.set(props.photo)}
    >
      <Image
        src={path}
        alt={props.photo.title}
        key={1+id}
        width={300}
        height={200}
        className={styles.image}
        style={{
          objectPosition: props.photo.position,
        }}
      />
      <div
        className={styles.info}
        key={2+id}
      >
        <h3>{props.photo.title}</h3>
        <p>
          {props.photo.location} • {props.photo.date}
        </p>
      </div>
    </div>
  );
};

export const CategoryComponent = ({
  photos,
  set,
}: {
  photos: Photo[];
  set: Dispatch<SetStateAction<Photo | null>>;
}) => {
  return (
    <div className={styles.category}>
      {photos.map((photo, index) => (
        <PhotoComponent
          key={index}
          photo={photo}
          set={set}
        />
      ))}
    </div>
  );
};