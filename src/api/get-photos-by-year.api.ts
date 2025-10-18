'use server';

import { cache } from "react";

import { DEFAULT_SETTINGS, generateOrGetCategories, getPhotosJson, resolvePhotoFileName } from "./photos-functions";

export const getPhotosByYear = cache(async (year: string) => {
  const categories = await generateOrGetCategories();
  const photos = await getPhotosJson();

  const photosByYear = categories[year];

  return photosByYear.map(name => ({
    ...DEFAULT_SETTINGS,
    ...photos[name],
    ...resolvePhotoFileName(name)
  }))
});

export default getPhotosByYear;
