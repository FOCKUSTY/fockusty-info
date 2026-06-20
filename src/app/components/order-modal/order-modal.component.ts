import { OrderType } from '@/types';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TvButton } from "@/components/tv-button/tv-button.component";

@Component({
  selector: 'order-modal',
  imports: [TvButton],
  templateUrl: './order-modal.html',
})
export class OrderModal {
  @Input({ required: true })
  public order!: OrderType;

  @Output()
  public close = new EventEmitter<void>();

  public constructor() {}

  public onClose() {
    this.close.emit();
  }

  public onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
