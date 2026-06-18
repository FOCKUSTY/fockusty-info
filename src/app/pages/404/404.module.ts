import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFound } from './404.component';

const routes: Routes = [
  {
    path: '**',
    component: NotFound,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class NotFoundModule {}
