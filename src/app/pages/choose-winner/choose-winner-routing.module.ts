import { ChooseWinnerComponent } from './choose-winner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
      path: '',
      component: ChooseWinnerComponent
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ChooseWinnerRoutingModule { }