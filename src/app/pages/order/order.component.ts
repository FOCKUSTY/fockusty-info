import type { OrderType } from '@/types';

import { OrderService } from '@/services/order.service';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'order',
  imports: [],
  styleUrl: '../../../styles/base-host.style.css',
  templateUrl: './order.html',
})
export class Order {
  private readonly orderService = inject(OrderService);
  public readonly orders = signal<OrderType[]>([]);

  public constructor() {}

  public ngOnInit() {
    const observable = this.orderService.execute();
    observable.subscribe(orders => {
      this.orders.set(orders);
    });
  }
}
