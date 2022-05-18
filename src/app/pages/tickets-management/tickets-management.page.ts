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
    this.userService.getAllUsers().subscribe(res => {
      this.users = res.users;
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

}
