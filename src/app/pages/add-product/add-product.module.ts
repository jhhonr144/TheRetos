import { addProductPageRoutingModule } from './add-product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule,
      IonicModule,
      addProductPageRoutingModule,
      FormsModule
      
    ],
    declarations: [
        AddProductComponent,
    ]
  })

  export class addProductModule { }