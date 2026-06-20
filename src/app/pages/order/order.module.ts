import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Order } from './order.component';

const routes: Routes = [
  {
    path: "order",
    component: Order,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class OrderModule {}
