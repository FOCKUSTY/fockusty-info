import { Component, input, Input, InputSignal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export const LINKS = {
  discord: {
    href: "https://discord.gg/97J8mnn4Gr",
    icon: "bootstrapDiscord"
  },

  telegram: {
    href: "http://t.me/fockusty",
    icon: "bootstrapTelegram",
  },

  github: {
    href: "http://github.com/fockusty",
    icon: "bootstrapGithub"
  },

  site: {
    href: "http://fockusty.netlify.app",
    icon: "heroGlobeAlt",
  }
} as const satisfies Record<string, { href: string, icon: string }>

@Component({
  selector: 'icon-link',
  imports: [NgIcon],
  templateUrl: './icon-link.html',
})
export class IconLink {
  public readonly links = LINKS;

  @Input({ required: true })
  public link!: keyof typeof LINKS;
  public size: InputSignal<number> = input<number>(24);

  public constructor() {}
}
