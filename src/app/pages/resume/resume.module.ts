import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Resume } from './resume.component';
import { Pages } from '@/enums/pages.enum';

const routes: Routes = [
  {
    path: Pages.resume,
    component: Resume,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ResumeModule {}
