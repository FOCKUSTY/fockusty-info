import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapDiscord, bootstrapGithub, bootstrapTelegram } from '@ng-icons/bootstrap-icons';
import { provideIcons } from '@ng-icons/core';
import { heroGlobeAlt } from '@ng-icons/heroicons/outline';

import { IconLink } from '@/app/components/icon-link';

@Component({
  selector: 'default-layout',
  templateUrl: './default.html',
  imports: [RouterOutlet, IconLink],
  viewProviders: [
    provideIcons({
      heroGlobeAlt,
      bootstrapGithub,
      bootstrapTelegram,
      bootstrapDiscord,
    }),
  ],
})
export class DefaultLayout {
  protected readonly currentYear = new Date().getFullYear();
}
