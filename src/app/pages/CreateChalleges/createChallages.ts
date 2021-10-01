import { ToastController, LoadingController } from '@ionic/angular';
import { NewChallengsService } from './../../Services/new-challengs.service';
import { Challengs } from './../../model/challengs.model';

import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-map',
  templateUrl: 'createChallenges.html',
  styleUrls: ['./map.scss']
})
export class MapPage  {
  privacy="Publico"

  NewChallengs : Challengs ={
    id_challengs:'',
    category:'',
    date_creation:'',  
    date_limit:'',
    description:'',
    id_creator: sessionStorage.getItem('uid'),
    name_challeng:'',
    person_limit:0,
    privacy:'',
    state_challeng:'',
    state_game:'',
    time_creation:'',
    time_limit:'',
    token_in:null,

  }
  loading :any;



  constructor( private storage: Storage,
    public database: NewChallengsService,public toastController: ToastController,public loadingController: LoadingController) {}

  save(){

    this.presentLoading();
    const data = this.NewChallengs;
    data.id_challengs = this.database.createId()
    this.database.addChallengs(data,data.id_challengs).then((_) => {
      this.presentToast()
      this.loading.dismiss();
    } )

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Perfecto! Reto Creado',
      duration: 2000
    });
    toast.present();
  }
  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Creando Reto...',
 
    });
    await this.loading.present();

  }
  notify(event) {
    if(event.detail.checked==false){
      this.privacy ="Privado"
    }else{
      this.privacy ="Publico"
    }
   
 }


}



