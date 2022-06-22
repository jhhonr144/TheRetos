import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsManagementPageRoutingModule } from './tickets-management-routing.module';

import { TicketsManagementPage } from './tickets-management.page';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsManagementPageRoutingModule
  ],
  declarations: [TicketsManagementPage, ModalComponent],
  entryComponents:[
    ModalComponent
  ]
})
export class TicketsManagementPageModule {}
