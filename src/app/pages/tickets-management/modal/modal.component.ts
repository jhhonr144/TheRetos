import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import Tickets from '../../../../../Backend/src/entities/Tickets';
import { TicketsService } from '../../../Services/tickets.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() user: any;
  ticket:number;

  constructor(private modalController: ModalController, 
    private ticketsService: TicketsService,
    private alertController: AlertController,
    private toastController: ToastController ) { }

  ngOnInit() {
    // console.log(this.user);
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalController.dismiss(closeModal);
  }

  async save(ticket){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación!',
      message: `Desea agregar ${ticket} tickets al usuario ${this.user.displayName}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.addTickets(ticket);
          },
        },
      ],
    });

    await alert.present();
  }

  addTickets(ticket){
    let newTickets : Tickets = {
      total_money: 0,
      date_creation:'',
      hour_creation:'',
      date_update:'',
      total_ticket: this.user.tickets.total_ticket + ticket,
      ticket_money: 0,
      uid: this.user.uid,
      state_ticket: '1',
      state_register: 1
    };

    this.ticketsService.createTickets(newTickets).subscribe(resp => {
        this.presentToast();
        this.close();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tickets agregados!',
      duration: 2000,
    });
    toast.present();
  }

}
