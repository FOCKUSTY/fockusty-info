import { DefaultLayout } from './default/default.component';
import { NoLayout } from './nolayout/nolayout.component';

export const Layouts = {
  DefaultLayout,
  NoLayout,
} as const;

export type Layouts = (typeof Layouts)[keyof typeof Layouts];
