import { Component, signal } from '@angular/core';
import { getMyAge } from '../services/age-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly interval = signal<NodeJS.Timeout | null>(null);
  
  protected readonly currentYear = new Date().getFullYear();
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
