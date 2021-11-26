import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';


export type CreateProducts= { 
  id_uid: string;
  id_product :string;
  name: string;
  path:string;
  category: number;
  marking:string; 
  ticket:number;
  Inventory: number;
  hours_create : string
  date_create : string;
  state : number; }


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  private baseUrl = environment.baseUrl + "/products";
  
  constructor( public storage: AngularFireStorage,public Firestore: AngularFirestore,private http: HttpClient) { }

  uploadImage(file:any, path : string, nombre : string):Promise<string>{
    return new Promise (resolve => {
   
      const filePath = path + '/'+ nombre;
      const ref =  this.storage.ref(filePath);
      const task = ref.put(file);
          // observe percentage changes

    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
           ref.getDownloadURL().subscribe(res=>{
             const downloadURL = res
             resolve(downloadURL)
             return;
           })    }
            )
     )
    .subscribe();
    }

    );
  }

    addProducts(products: CreateProducts){
      return this.http.post(`${this.baseUrl}`, products)
  }

  getProducts(){
    return this.http.get(`${this.baseUrl}`)
}



}
