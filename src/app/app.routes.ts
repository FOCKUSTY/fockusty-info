import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { useLayout } from '@/utils/use-layout';

import { Layouts } from './layouts';
import { PAGES_ROUTES } from './pages';

export const routes: Routes = [
  useLayout({
    layout: Layouts.DefaultLayout,
    routes: PAGES_ROUTES
  }),
  useLayout({
    layout: Layouts.NoLayout,
    routes: PAGES_ROUTES,
    route: {
      path: "nolayout"
    }
  })
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppModule {}
