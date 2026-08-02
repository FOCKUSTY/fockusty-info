import type { OnDestroy, OnInit } from '@angular/core';
import { Component, signal } from '@angular/core';

import { TvButton } from '@/app/components/tv-button/tv-button.component';
import { getMyAge } from '@/services/age-service';
import { isBirthDay, isNewYear } from '@/services/date-service';

@Component({
  selector: 'home-component',
  templateUrl: './home.html',
  styleUrl: '../../../styles/base-host.style.css',
  imports: [TvButton],
})
export class Home implements OnInit, OnDestroy {
  private readonly interval = signal<NodeJS.Timeout | null>(null);
  protected readonly age = signal<string>(getMyAge(new Date()));

  protected readonly newYear = isNewYear(new Date()) ? 'С Новым годом!' : null;
  protected readonly birthDay = isBirthDay(new Date()) ? 'С Днём рождения!' : null;

  public constructor() {}

  public ngOnInit() {
    const interval = setInterval(() => {
      this.age.set(getMyAge(new Date()));
    }, 10);

    this.interval.set(interval);
  }

  public ngOnDestroy() {
    const interval = this.interval();
    if (interval) {
      clearInterval(interval);
    }

    this.interval.set(null);
  }
}
