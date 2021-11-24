import { ProductsService } from './../../Services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../model/Products';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  date: Date = new Date();
  
  NewProducts : Products ={
    id_uid: '',
    id_product :'',
    name: '',
    path:'',
    category:0,
    marking:'',
    ticket:0,
    Inventory: 0,
    hours_create : this.date.toLocaleTimeString(),
    date_create : this.date.toLocaleDateString() ,
    state : 1,
  }

  constructor(private ProductsService : ProductsService) { }

  ngOnInit() {}

  

 async saveProduct(event : any){
   const path = 'Productos'
   const name = 'Prueba'
   const file = event.target.files[0];
  const res = await this.ProductsService.uploadImage(file,path,name)
  console.log(res)
  }

  SaveProduct(){
    console.log(this.NewProducts)
  }

}
