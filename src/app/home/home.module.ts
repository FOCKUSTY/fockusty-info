import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: Home,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class HomeModule {}
