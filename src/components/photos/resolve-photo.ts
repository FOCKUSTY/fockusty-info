import type { Photo } from "@/types/photo.types";

export const resolvePhoto = (photo: Photo) => {
  return {
    id: `${photo.date}-${photo.title}`,
    path: `/photos/${photo.date}.${photo.name}.jpg`,
  };
};
