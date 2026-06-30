import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Resume } from './resume.component';

const routes: Routes = [
  {
    path: "resume",
    component: Resume,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class ResumeModule {}
