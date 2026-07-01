import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tv-button',
  standalone: true,
  templateUrl: './tv-button.html',
})
export class TvButton {
  private readonly router = inject(Router);

  @Output()
  public clicked = new EventEmitter<MouseEvent>();

  @Input()
  public href?: string;

  constructor() {}

  public onClick(event: MouseEvent): void {
    this.clicked.emit(event);

    if (this.href) {
      this.router.navigate([this.href]);
    }
  }
}
