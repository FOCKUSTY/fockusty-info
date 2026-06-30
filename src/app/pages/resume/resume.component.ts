import { Component } from '@angular/core';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-resume',
  imports: [MarkdownComponent],
  templateUrl: './resume.html',
})
export class Resume {}
