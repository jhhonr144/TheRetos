import { ValidateWinnerComponent } from './validate-winner.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
      path: '',
      component: ValidateWinnerComponent
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class validateWinnerRoutingModule { }