import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpeakerDetailPage } from './challenges-details';

const routes: Routes = [
  {
    path: '',
    component: SpeakerDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakerDetailPageRoutingModule { }
