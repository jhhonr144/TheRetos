import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpeakerDetailPage } from './challenges-details'; 
import { SpeakerDetailPageRoutingModule } from './speaker-detail-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakerDetailPageRoutingModule
  ],
  declarations: [
    SpeakerDetailPage,
  ]
})
export class SpeakerDetailModule { }
