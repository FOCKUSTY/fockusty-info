'use server'

import type { Photo } from "types/photo.types";

import fs from "node:fs/promises";
import { join, parse } from "path";

const SETTINGS_FILE_EXTENSION = ".json";

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

const PHOTO_REG_EXP = /(\d{4}-\d{2}-\d{2})_(.*)\.(top|right|center|left|bottom)\..{3,4}/;

export default async function readPhotos() {
  const global = await fs.readdir(join("."));

  console.log({global});
  console.log({netlify: await fs.readdir(join(".", ".netlify"))});
  console.log({test: await fs.readdir(join(".", global.includes("public") ? "public" : ".next"))});

  const photosPath = join(".", global.includes("public") ? "public" : ".next", "photos");
  const categories = await fs.readdir(photosPath);

  const output: {
    [key: string]: {
      [photo: string]: Required<Photo>
    }
  } = {};

  output["все"] = {};

  for (const category of categories) {
    const path = join(photosPath, category);
  
    output[category] = {};

    const photos = await fs.readdir(path);

    for (const photo of photos) {
      if (photo.endsWith(SETTINGS_FILE_EXTENSION)) continue;

      const { name } = parse(photo)
      const matched = photo.match(PHOTO_REG_EXP);
      if (!matched) continue;

      try {
        const settings = JSON.parse(await fs.readFile(name + SETTINGS_FILE_EXTENSION, "utf-8"));
        
        output[category][photo] = {
          ...DEFAULT_SETTINGS,
          ...settings,
          date: matched[1],
          title: matched[2].replaceAll("_", " "),
          category: category,
          name: photo,
          position: matched[3]
        }
      } catch {
        output[category][photo] = {
          ...DEFAULT_SETTINGS,
          date: matched[1],
          title: matched[2].replaceAll("_", " "),
          category: category,
          name: photo,
          position: matched[3]
        } as Required<Photo>;
      }

      output["все"][photo] = output[category][photo];
    }
  };

  return output;
}
