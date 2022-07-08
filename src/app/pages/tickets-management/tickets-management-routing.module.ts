import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsManagementPage } from './tickets-management.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsManagementPageRoutingModule {}
