"use server";

import type { JsonCategories, JsonPhoto, Photo, Settings } from "types/photo.types";
import { cache } from "react";
import { readFile, writeFile } from "fs/promises";

const DEFAULT_SETTINGS: Photo = {
  date: "Cool date",
  title: "Cool photo",
  camera: "Nikon D3500",
  location: "Россия, г. Уфа",
  description: "Фоточка от Фокусти",
  categories: ["all"],
  position: "center",
  name: "hihihih"
};

const resolveName = (fileName: string) => {
  const [date, name] = fileName.split(".");

  return {
    date,
    name,
    title: name.replaceAll("_", " "),
  };
};

const getPhotosJson = cache(async (): Promise<Record<string, JsonPhoto>> => {
  return fetch(process.env.THIS_URL + "/photos/photos.json", {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache",
  }).then(data => data.json());
});

const getCategories = cache(async (): Promise<JsonCategories> => {
  return fetch(process.env.THIS_URL + "/photos/categories.json", {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache",
  }).then(data => data.json());
});

const generateOrGetCategories = cache(async (): Promise<JsonCategories> => {
  if (process.env.NODE_ENV !== "development") {
    return getCategories();
  };

  const photos: Record<string, JsonPhoto> = JSON.parse(await readFile(process.env.PHOTOS_PATH + "/photos.json", "utf8"));
  const categories: JsonCategories = {};
  
  categories["Все"] = [];

  for (const name in photos) {
    const photo = photos[name];
    
    photo.categories.forEach(category => {
      if (!categories[category]) {
        categories[category] = [];
      };

      if (!categories["Все"].includes(name)) {
        categories["Все"].push(name)
      }
      
      if (!categories[category].includes(name)) {
        categories[category].push(name);
      }
    });
  };

  await writeFile(process.env.PHOTOS_PATH + "/categories.json", JSON.stringify(categories, undefined, 2), "utf8");
  
  return categories;
});

export default async function getCategoriedPhotos(category: string): Promise<{
  categories: string[],
  photos: Photo[]
}> {
  const categories = await generateOrGetCategories();
  const photos = await getPhotosJson();

  const categoriedPhotos = categories[category];

  return {
    categories: Object.keys(categories),
    photos: categoriedPhotos.map(categoriedPhoto => (<Photo>{
      ...DEFAULT_SETTINGS,
      ...photos[categoriedPhoto],
      ...resolveName(categoriedPhoto)
    })),
  };
}
