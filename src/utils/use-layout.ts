import type { Route, Routes } from '@angular/router';
import type { Layouts } from '@/app/layouts';

export const useLayout = ({
  layout,
  routes,
  route,
}: {
  layout: Layouts;
  routes: Routes;
  route?: Route;
}): Route => {
  return {
    path: '',
    ...route,
    component: layout,
    children: routes,
  };
};
