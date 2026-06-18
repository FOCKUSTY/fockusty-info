import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'no-layout',
  templateUrl: './nolayout.html',
  imports: [RouterOutlet],
})
export class NoLayout {}
