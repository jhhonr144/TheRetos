import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartMarkertComponent } from './start-markert.component';

const routes: Routes = [
  {
    path: '',
    component: StartMarkertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartMarkertRouting { }
