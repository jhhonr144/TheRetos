import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenutopComponent } from './menutop.component';
import { menuPageRoutingModule } from './menutop-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    menuPageRoutingModule
  ],
  declarations: [
    MenutopComponent,
  ]
})
export class AccountModule { }
