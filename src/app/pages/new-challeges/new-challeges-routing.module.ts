import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewChallegesComponent } from './new-challeges.component';

const routes: Routes = [
  {
    path: '',
    component: NewChallegesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewChallegesRoutingModule { }
