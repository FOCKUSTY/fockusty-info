export type Resume = {
  title: string;
  fileName: string;
}

export type ResumesJson = {
  $schema: string;
  info: Resume[];
}
