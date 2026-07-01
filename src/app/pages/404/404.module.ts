import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFound } from './404.component';
import { Pages } from '@/enums/pages.enum';

const routes: Routes = [
  {
    path: Pages.notfound,
    component: NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class NotFoundModule {}
