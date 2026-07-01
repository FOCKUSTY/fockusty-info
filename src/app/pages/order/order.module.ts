import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Order } from './order.component';
import { Pages } from '@/enums/pages.enum';

const routes: Routes = [
  {
    path: Pages.order,
    component: Order,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class OrderModule {}
