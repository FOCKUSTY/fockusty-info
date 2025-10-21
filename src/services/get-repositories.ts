import type { Project } from "@/types/project.types";

import { cache } from "react";

import { GithubApi } from "@/api/github.api";

export const getRepositories = cache(async () => {
  try {
    const data = await GithubApi.fetchRepositories("users", "fockusty");

    return data.json() as Promise<Project[]>;
  } catch {
    return null;
  }
});
