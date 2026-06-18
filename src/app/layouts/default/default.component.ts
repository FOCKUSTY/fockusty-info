import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NgIcon, provideIcons } from "@ng-icons/core";

import { heroGlobeAlt } from "@ng-icons/heroicons/outline";
import {
  bootstrapTelegram,
  bootstrapGithub,
  bootstrapDiscord
} from "@ng-icons/bootstrap-icons";
import { IconLink } from "@/components/icon-link";

@Component({
  selector: "default-layout",
  templateUrl: "./default.html",
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
