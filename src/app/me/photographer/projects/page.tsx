'use client'

// import type { Photo } from "types/photo.types";

// import { useState, useEffect, Dispatch, SetStateAction } from "react";
// import Image from "next/image";

// import { useDropdown } from "components/dropdown";
// import readPhotos from "api/photos.api";

// import styles from "./page.module.css";
// import useMediaQuery from "@/hooks/media.hook";

// type Photos = { [key: string]: { [photo: string]: Photo } }

/* const resolvePhoto = (photo: Photo) => {
  return {
    id: `${photo.date}-${photo.title}`,
    path: `/photos/${photo.category}/${photo.name}`
  }
}

const Photo = ({
  photo,
  set
}: {
  photo: Photo,
  set: Dispatch<SetStateAction<Photo | null>>
}) => {
  const { id, path } = resolvePhoto(photo);

  return (
    <div
      key={id}
      className={styles.card}
      onClick={() => set(photo)}
    >
      <Image
        src={path}
        alt={photo.title}
        width={300}
        height={200}
        className={styles.image}
        style={{
          objectPosition: photo.position
        }}
      />
      <div className={styles.info}>
        <h3>{photo.title}</h3>
        <p>{photo.location} • {photo.date}</p>
      </div>
    </div>
  )
}

const ModalPhoto = ({
  photo,
}: {
  photo: Photo,
}) => {
  const { id, path } = resolvePhoto(photo);
  const isLessThan = useMediaQuery("(max-width: 1000px)")

  return (
    <div
      key={id}
      className={styles.modal__photo}
    >
      <div className={styles.modal__photo_image_container}>
        <Image
          src={path}
          alt={photo.title}
          width={isLessThan ? 600 : 1000}
          height={isLessThan ? 400 : 1000}
          className={styles.modal__photo_image}
          style={{
            objectPosition: photo.position
          }}
        />
        <span className={styles.modal__photo_camera}>Камера: {photo.camera}</span>
      </div>

      <div className={styles.modal___photo_info}>
        <h2>{photo.title}</h2>
        <p>{photo.location} • {photo.date}</p>
        <p>{photo.description}</p>
      </div>
    </div>
  )
};

const Category = ({
  photos,
  name,
  set,
}: {
  photos: Photos,
  name: string,
  set: Dispatch<SetStateAction<Photo | null>>
}) => {
  const data = photos[name];
  const keys = Object.keys(data);

  return (
    <div className={styles.category}>
      {
        keys.map(key => (
          <Photo
            key={key}
            photo={{
              ...data[key],
              name: key
            }}
            set={set}
          />
        ))        
      }
    </div>
  )
} */

const Page = () => {
  return (
    <div className="page-center">
      Страница не доступна
    </div>
  )
}

/* const Page = () => {
  const [ photos, setPhotos ] = useState<Photos>();
  const [ selectedCategory, setSelectedCategory ] = useState<string>('все');
  const [ selectedPhoto, setSelectedPhoto ] = useState<Photo | null>(null);
  const { Dropdown, setActived }= useDropdown({ id: "photographer__projects__choose", className: styles.dropdown });

  useEffect(() => {
    (async () => {
      setPhotos(await readPhotos());
    })();
  }, []);
  
  if (!photos) {
    return <>Ждите</>
  }

  return (
    <div className="page-center" style={{justifySelf: "normal", flexDirection: "column-reverse"}}>
      <Category
        name={selectedCategory}
        photos={photos}
        set={setSelectedPhoto}
      />
      <Dropdown
        summary={<button>Выберите категорию (Сейчас: {selectedCategory})</button>}
      >
        {
          Object.keys(photos).filter(category => category != selectedCategory).map(category => (
            <span
              key={"categorty_" + category}
              onClick={() => {
                setSelectedCategory(category);
                setActived(false)
              }}
            >
              {category}
            </span>
          ))
        }
      </Dropdown>
    
      {selectedPhoto &&
        <div
          id="photographer__projects__selected_photo_modal"
          className={styles.modal}
          onClick={(e) => {
            if ((e.target as HTMLElement).id !== "photographer__projects__selected_photo_modal") return;

            setSelectedPhoto(null);
          }}
        >
          <div>
            <button onClick={() => setSelectedPhoto(null)}>
              Вернуть к просмотру
            </button>
            <ModalPhoto
              photo={{
                ...selectedPhoto,
                category: selectedPhoto.category,
              }}
            />
          </div>
        </div>
      }
    </div>
  )
} */

export default Page