import { validateWinnerRoutingModule } from './validate-winner-routing.module';
import { ValidateWinnerComponent } from './validate-winner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      FormsModule,
      validateWinnerRoutingModule,
      
    ],
    declarations: [
        ValidateWinnerComponent,
    ]
  })
  export class validateWinnerModule { }