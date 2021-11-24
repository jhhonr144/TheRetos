import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor( public storage: AngularFireStorage) { }

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
}
