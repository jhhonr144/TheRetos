import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseWinnerRoutingModule } from './choose-winner-routing.module';
import { ChooseWinnerComponent } from './choose-winner.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      ChooseWinnerRoutingModule
      
    ],
    declarations: [
        ChooseWinnerComponent,
    ]
  })
  export class chooseWinnerModule { }