import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { OrderModal } from './order-modal.component';

describe('OrderModal', () => {
  let component: OrderModal;
  let fixture: ComponentFixture<OrderModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderModal]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrderModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
