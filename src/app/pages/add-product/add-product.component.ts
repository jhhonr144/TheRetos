import { ProductsService } from './../../Services/products.service';
import { Component, OnInit } from '@angular/core';
import { Products } from '../../model/Products';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  private ruta: string
  date: Date = new Date();

  NewProducts: Products = {
    id_uid: '',
    id_product: '',
    name: '',
    path: '',
    category: 0,
    marking: '',
    ticket: 0,
    Inventory: 0,
    hours_create: this.date.toLocaleTimeString(),
    date_create: this.date.toLocaleDateString(),
    state: 1,
  }
  loading: any;

  constructor(private ProductsService: ProductsService, public loadingController: LoadingController, public alertCtrl: AlertController) { }

  ngOnInit() { }



  async saveProduct(event: any) {


    this.presentLoading('Subiendo Imagen').then(async () => {
      const path = 'Productos'
      const name = this.NewProducts.name
      const file = event.target.files[0];
      const res = await this.ProductsService.uploadImage(file, path, name)
      this.ruta = res
      this.loading.dismiss();
    });


  }

  SaveProduct() {
    this.NewProducts.path = this.ruta;
    this.presentLoading('Cargando Nuevo Producto...').then(() => {
      this.ProductsService.addProducts(this.NewProducts).subscribe(res => {
        this.loading.dismiss();
        if (res) {
         this.showAlert();
        }
      })
    });
  }

  //mostrar mensaje caargando
  async presentLoading(msg) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msg,

    });
    await this.loading.present();

  }

  async showAlert() {  
    const alert = await this.alertCtrl.create({  
      header: 'Producto Creado',  
      message: 'Se ha Agregado un Nuevo Producto',  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }  



}
