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
  specialCategories: string[];
  photos: Photo[];
}> {
  const categories = await generateOrGetCategories();
  const photos = await getPhotosJson();

  const categoriedPhotos = categories[category];

  const defaultCategories: string[] = [];
  const specialCategories: string[] = [];

  Object.keys(categories).forEach((category) => {
    if (category.startsWith("!")) {
      return specialCategories.push(category);
    }

    return defaultCategories.push(category);
  });

  return {
    categories: defaultCategories,
    specialCategories,
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
