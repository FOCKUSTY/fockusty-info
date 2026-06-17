import { Component, signal } from '@angular/core';
import { getMyAge } from '@/services/age-service';

@Component({
  selector: 'home-component',
  templateUrl: './home.html',
  imports: [],
})
export class Home {
  private readonly interval = signal<NodeJS.Timeout | null>(null);
  protected readonly age = signal<string>(getMyAge(new Date()));

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
