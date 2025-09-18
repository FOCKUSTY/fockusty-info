'use server'

import { cache } from "react";
import type { Photo } from "types/photo.types";

const DEFAULT_SETTINGS: Photo = {
  date: "Cool date",
  title: "Cool photo",
  camera: "Nikon D3500",
  location: "Россия, г. Уфа",
  description: "Фоточка от Фокусти",
  category: "all",
  name: "hi",
  position: "center"
};

const resolveName = (fileName: string) => {
  const [ date, name ] = fileName.split(".");

  return {
    date,
    name,
    title: name
  };
}

const getPhotosJson = cache(async (): Promise<string[]> => {
  return await (await fetch(process.env.THIS_URL + "/photos/photos.json", {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache"
  })).json();
});

const getCategory = cache(async (category: string): Promise<{
  [key: string]: {
    description: string
    categories: string[]
    position: string
    camera: string
    location: string
  }
}> => {
  return await (await fetch(`${process.env.THIS_URL}/photos/${category}/${category}.json`, {
    next: {
      revalidate: 3000,
    },
    cache: "force-cache"
  })).json();
})

export default async function readPhotos() {
  const output: {
    [key: string]: {
      [photo: string]: Required<Photo>
    }
  } = {};

  output["все"] = {};

  const categories = await getPhotosJson();

  for (const category of categories) {
    output[category] = {};
    
    const data: {
      [key: string]: {
        description: string
        categories: string[]
        position: string
        camera: string
        location: string
      }
    } = await getCategory(category)

    for (const key in data) {
      const settings = <Required<Photo>>{
        ...DEFAULT_SETTINGS,
        category,
        ...data[key],
        ...resolveName(key),
      }

      output[category][key] = settings;
      output["все"][key] = settings;
    }
  }

  return output;
}
