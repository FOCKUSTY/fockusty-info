import type { OrderType } from '@/types';

import { OrderService } from '@/services/order.service';
import { Component, inject, signal } from '@angular/core';
import { OrderModal } from "@/app/components/order-modal";

@Component({
  selector: 'order',
  imports: [OrderModal],
  styleUrl: '../../../styles/base-host.style.css',
  templateUrl: './order.html',
})
export class Order {
  private readonly orderService = inject(OrderService);
  public readonly orders = signal<OrderType[]>([]);

  public readonly orderModalOpened = signal<boolean>(false);
  public readonly selectedOrder = signal<OrderType | null>(null);

  public constructor() {}

  public ngOnInit() {
    const observable = this.orderService.execute();
    observable.subscribe(orders => {
      this.orders.set(orders);
    });
  }

  public selectOrder(order: OrderType) {
    this.selectedOrder.set(order);
    this.orderModalOpened.set(true);
  }

  public closeOrderModal() {
    this.selectedOrder.set(null);
    this.orderModalOpened.set(false);
  }
}
