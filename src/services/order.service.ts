import type { OrderType } from '@/types';

import { TransferState } from '@angular/core';
import { Injectable, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Api } from '@/enums/api.enum';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private static readonly STATE_KEY = makeStateKey<OrderType[]>('orders');

  constructor(
    private readonly transferState: TransferState,
    private readonly http: HttpClient,
  ) {}

  public execute() {
    const stored = this.getFromState();
    if (stored) {
      return stored;
    }

    const observable = this.fetch();
    return observable;
  }

  private fetch() {
    const observable = this.http.get<OrderType[]>(Api.orders, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return observable;
  }

  private getFromState() {
    const stored = this.transferState.get(OrderService.STATE_KEY, null);
    if (stored) {
      this.transferState.remove(OrderService.STATE_KEY);
      return of(stored);
    }

    return null;
  }
}
