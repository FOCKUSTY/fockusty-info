"use server";

import type { Photo } from "types/photo.types";

import {
  DEFAULT_SETTINGS,
  generateOrGetCategories,
  getPhotosJson,
  resolvePhotoFileName,
} from "./photos-functions";

export default async function getCategoriedPhotos(category: string): Promise<{
  categories: string[];
  photos: Photo[];
}> {
  const categories = await generateOrGetCategories();
  const photos = await getPhotosJson();

  const categoriedPhotos = categories[category];

  return {
    categories: Object.keys(categories),
    photos: !categories[category]
      ? []
      : categoriedPhotos.map(
        (categoriedPhoto) =>
          <Photo>{
            ...DEFAULT_SETTINGS,
            ...photos[categoriedPhoto],
            ...resolvePhotoFileName(categoriedPhoto),
          },
      ),
  };
}
