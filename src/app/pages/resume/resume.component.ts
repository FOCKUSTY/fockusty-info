import { ResumesService } from '@/services/resumes.service';
import { Component, inject, signal } from '@angular/core';
import { MarkdownComponent, MarkdownService } from "ngx-markdown";
import { Resume as ResumeType } from '@/types/resume.type';
import { TvButton } from "@/app/components/tv-button/tv-button.component";
import { Api } from '@/enums/api.enum';

@Component({
  selector: 'app-resume',
  imports: [MarkdownComponent, TvButton],
  styleUrl: '../../../styles/base-host.style.css',
  templateUrl: './resume.html',
})
export class Resume {
  private readonly resumesService = inject(ResumesService);
  public readonly resumes = signal<ResumeType[]>([]);
  public readonly content = signal<string | null>(null);

  public constructor(
    private markdownService: MarkdownService,
  ) {}

  public ngOnInit() {
    const observable = this.resumesService.execute();
    observable.subscribe((resumes) => {
      this.fetchResume(resumes[0].fileName);
      this.resumes.set(resumes);
    });
  }

  public fetchResume(resume: string) {
    const markdown = this.markdownService.getSource(`${Api.resume}/${resume}`);
    markdown.subscribe((content) => {
      this.content.set(content);
    });
  }
}
