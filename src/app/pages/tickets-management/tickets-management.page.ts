import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from '../../Services/users.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-tickets-management',
  templateUrl: './tickets-management.page.html',
  styleUrls: ['./tickets-management.page.scss'],
})
export class TicketsManagementPage implements OnInit {

  users:any[];

  constructor(public modalController: ModalController, private userService:UsersService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(res => {
      this.users = res.users;
    });
  }

  async presentModal(user:any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'user': user,
      }
    });
    await modal.present();
    await modal.onDidDismiss();
    this.loadUsers();
  }

}
