import { JsonCategories, JsonPhoto, Photo } from "@/types/photo.types";

import { readFile, writeFile } from "fs/promises";

import { cache } from "react";

export const DEFAULT_SETTINGS: Photo = {
  date: "Cool date",
  title: "Cool photo",
  camera: "Nikon D3500",
  location: "Россия, г. Уфа",
  description: "Фоточка от Фокусти",
  unique: false,
  categories: ["all"],
  position: "center",
  name: "hihihih",
};

export const resolvePhotoFileName = (fileName: string) => {
  if (fileName.includes("/")) {
    const path = fileName.split("/");

    const name = path[path.length - 1];
    const [date, title] = name.split(".");

    return {
      date,
      title: title.replaceAll("_", " "),
      name: fileName,
    };
  }

  const [date, name] = fileName.split(".");

  return {
    date,
    name: fileName,
    title: name.replaceAll("_", " "),
  };
};

export const getPhotosJson = cache(async (): Promise<Record<string, JsonPhoto>> => {
  return fetch(process.env.THIS_URL + "/photos/photos.json", {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache",
  }).then((data) => data.json());
});

export const getCategories = cache(async (): Promise<JsonCategories> => {
  return fetch(process.env.THIS_URL + "/photos/categories.json", {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache",
  }).then((data) => data.json());
});

export const generateOrGetCategories = cache(async (): Promise<JsonCategories> => {
  if (process.env.NODE_ENV !== "development") {
    return getCategories();
  }

  const photos: Record<string, JsonPhoto> = JSON.parse(
    await readFile(process.env.PHOTOS_PATH + "/photos.json", "utf8")
  );
  const categories: JsonCategories = {};

  categories["все"] = [];

  for (const name in photos) {
    const photo = photos[name];

    photo.categories.forEach((category) => {
      if (!categories[category]) {
        categories[category] = [];
      }

      if (!categories["все"].includes(name)) {
        categories["все"].push(name);
      }

      if (!categories[category].includes(name)) {
        categories[category].push(name);
      }
    });
  }

  await writeFile(
    process.env.PHOTOS_PATH + "/categories.json",
    JSON.stringify(categories, undefined, 2),
    "utf8"
  );

  return categories;
});
