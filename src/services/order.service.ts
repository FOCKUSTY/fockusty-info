import type { OrderType } from "@/types";

import { HttpClient } from "@angular/common/http";
import { Injectable, makeStateKey, TransferState } from "@angular/core";
import { map, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class OrderService {
  private static readonly STATE_KEY = makeStateKey<OrderType[]>("orders");

  public constructor(
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
    const observable = this.http.get<OrderType[]>("/api/orders", {
      headers: {
        'Content-Type': 'application/json'
      }
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
