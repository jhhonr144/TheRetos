import { Component, OnInit } from '@angular/core';
import { Challengs } from './../../model/challengs.model';
import { AuthService } from './../../Services/auth.service';
import { AlertController, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';
import { ConferenceData } from '../../providers/conference-data';
import { Router } from '@angular/router';
import { NewChallengsService } from '../../Services/new-challengs.service';
import { TicketsService } from '../../Services/tickets.service';

@Component({
  selector: 'app-validate-winner',
  templateUrl: './validate-winner.component.html',
  styleUrls: ['./validate-winner.component.scss'],
})
export class ValidateWinnerComponent implements OnInit {
  Challengs : Challengs[]=[];
  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  loading :any;
  data: any;
  Tickets = []


  constructor( 
    private AuthService: AuthService,  
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public config: Config,
    public database: NewChallengsService,
    public serTicket: TicketsService,
 ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';
    this.getChallengs();
  }
  ionViewDidEnter(){
    this.AuthService.user$.subscribe(
      datos => {
      this.slcTicket(datos.uid)
    }
    );
  }
    //consultamos retos
    getChallengs() {
      this.presentLoading().then(()=>{
        this.database.getChallengs<Challengs>().subscribe(res =>{
          this.Challengs = res;
          this.loading.dismiss();
        }   );
       
      });
      //seleccionamos usuario
      this.AuthService.user$.subscribe(
        datos => {
        this.slcTicket(datos.uid)
      }
      );
    //seleccionamos retos   
  }
  //seleccionar ticket
slcTicket(uid){  
  this.serTicket.getTickets(uid)
  .subscribe(data => {
         
          this.Tickets = [data]    
          let database = this.local2json('Ticket');
          database.set(data);
  },
  err => console.log('HTTP Error', err),)
}
//mostrar mensaje caargando
async presentLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Estamos preparando todo para ti !...',

  });
  await this.loading.present();

}
//reto seleccionado 
details(Challengs: any){
  let database = this.local2json('Challenges');
  database.set(Challengs);
  this.router.navigateByUrl('/app/tabs/winners/winners-details');
}


// nombre de la coleccion de datos
local2json(name) {
  // asignamos un valor o recuperamos datos almacenados
  let DB = localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : [];

  /* metodos */
  return {
    // obtener todos los datos de la coleccion
    get: () => {
      return DB;
    },
    // ingresar nuevos datos
    push: (obj) => {
      DB.push(obj);
      localStorage.setItem(name, JSON.stringify(DB));
    },
    // ingresar una nueva coleccion
    set: (colection) => {
      DB = colection;
      localStorage.setItem(name, JSON.stringify(DB));
    },
    // eliminar todos los datos de la coleccion
    delete: () => {
      DB = [];
      localStorage.setItem(name, JSON.stringify(DB));
    },
  };
}

  

}
