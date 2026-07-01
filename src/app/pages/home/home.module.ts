import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Home } from './home.component';
import { Pages } from '@/enums/pages.enum';

const routes: Routes = [
  {
    path: Pages.home,
    component: Home,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class HomeModule {}
