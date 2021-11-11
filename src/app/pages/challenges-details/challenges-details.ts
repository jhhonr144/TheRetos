import { TckParticipationsService } from './../../Services/tck-participations.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from '../../providers/conference-data';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TicketsService } from '../../Services/tickets.service';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html',
  styleUrls: ['./speaker-detail.scss'],
})
export class SpeakerDetailPage implements OnInit {
  Challenges: any[];
  Tickets: any;
  id_Challenges

  speaker: any;

  constructor(
    private AuthService: AuthService,
    public Participate: TckParticipationsService,
    public alertController: AlertController,
    private dataProvider: ConferenceData,
    private route: ActivatedRoute,
    public actionSheetCtrl: ActionSheetController,
    public confData: ConferenceData,
    public inAppBrowser: InAppBrowser,
    public serTicket: TicketsService,
  ) {}

  ngOnInit(): void {
    this.getChallengesDatails()
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      const speakerId = this.route.snapshot.paramMap.get('speakerId');
      if (data && data.speakers) {
        for (const speaker of data.speakers) {
          if (speaker && speaker.id === speakerId) {
            this.speaker = speaker;
            break;
          }
        }
      }
    });
  }

  openExternalUrl(url: string) {
    this.inAppBrowser.create(
      url,
      '_blank'
    );
  }

  async openSpeakerShare(speaker: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log(
              'Copy link clicked on https://twitter.com/' + speaker.twitter
            );
            if (
              (window as any).cordova &&
              (window as any).cordova.plugins.clipboard
            ) {
              (window as any).cordova.plugins.clipboard.copy(
                'https://twitter.com/' + speaker.twitter
              );
            }
          }
        },
        {
          text: 'Share via ...'
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openContact(speaker: any) {
    const mode = 'ios'; // this.config.get('mode');

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Contact ' + speaker.name,
      buttons: [
        {
          text: `Email ( ${speaker.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + speaker.email);
          }
        },
        {
          text: `Call ( ${speaker.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + speaker.phone);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  getChallengesDatails(){
    //aca debes es seleccionar el uid de la persona
    let database = this.local2json('Challenges');
    this.id_Challenges  = database.get()
    this.Challenges = [database.get()];

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

//mensaje de confirmacion 
async presentAlertConfirm() {

  let database = this.local2json('Ticket');
  let Tickets = database.get();
  this.Tickets = Tickets.uid

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '¡Estas Preparado!',
    message: 'Unete al reto!!!',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'De Una',
        handler: () => {

          this.AuthService.user$.subscribe(
            datos => {
            this.slcTicket(datos.uid,this.id_Challenges.id_challengs)
          }
          );

        }
      }
    ]
  });

  await alert.present();
}


  //seleccionar ticket
  slcTicket(uid,id_Challenges){  
    let Participate = {
      uid : uid,
      id_Challenges :id_Challenges
    }
    this.Participate.validationParticipate(Participate).subscribe(
      datos=>{
        console.log(datos)
      }
    )
  
  }

 participate(){

} 



}
