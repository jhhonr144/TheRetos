import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenutopComponent } from './menutop.component';

const routes: Routes = [
  {
    path: '',
    component: MenutopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class menuPageRoutingModule { }
