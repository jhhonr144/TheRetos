import { StartMarkertRouting } from './start-markert-routing.module';
import { StartMarkertComponent } from './start-markert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartMarkertRouting
  ],
  declarations: [
    StartMarkertComponent,
  ]
})
export class startMarkModule { }
