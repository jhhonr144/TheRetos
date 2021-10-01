import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { MapPage } from './createChallages';
import { MapPageRoutingModule } from './create-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MapPageRoutingModule,
    FormsModule
    
  ],
  declarations: [
    MapPage,
  ]
})
export class MapModule { }
