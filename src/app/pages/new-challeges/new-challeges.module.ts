import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewChallegesComponent } from './new-challeges.component';
import { NewChallegesRoutingModule } from './new-challeges-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewChallegesRoutingModule
  ],
  declarations: [
    NewChallegesComponent,
  ]
})
export class NewChallegesModule { }
