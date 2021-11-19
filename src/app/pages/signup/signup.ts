import { Response } from 'express';
import { TicketsService } from './../../Services/tickets.service';
import { Tickets } from './../../model/Tickets';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { email: '', password: '' };
  uid : string

  NewTickets : Tickets ={
    total_money: 0,
    date_creation:'',
    hour_creation:'',
    date_update:'',
    total_ticket: 0,
    ticket_money: 0,
    uid: '',
    state_ticket: '1',
    state_register: 1
  }
  submitted = false;
  ResponseTickets: Object;
  loading: any;

  constructor(
    public database: TicketsService,
    public router: Router,
    public userData: UserData,
    public loadingController: LoadingController,
    private AuthService: AuthService

  ) {}

  async onSignup(form: NgForm) {
    try{
      this.submitted = true;
      if (form.valid) {
        this.presentLoading();
        //this.userData.signup(this.signup.email);
        this.AuthService.register(this.signup.email, this.signup.password).subscribe(user => {
          if(user){
            this.uid = user.uid
            //verificamos si el email esta verificado      
            //const IsEmailVerified = this.AuthService.IsEmailVerified(user)
            //this.redirectUser(IsEmailVerified)
            this.router.navigate(['/app/tabs/create']);
          }
        });
        // this.router.navigateByUrl('/app/tabs/schedule');
      }
    }catch(error){console.log(error)}
    this.loading.dismiss(); 
  }

  private redirectUser(IsEmailVerified:Boolean) : void{
    this.saveTicket();
    if(IsEmailVerified){
      this.router.navigate(['/app/tabs/create'])


    }else{
      this.router.navigate(['verify-email'])
    }
 
  }

  saveTicket(){
    let date: Date = new Date();
    this.NewTickets.date_creation= date.toLocaleDateString()   
    this.NewTickets.hour_creation= date.toLocaleTimeString()
    this.NewTickets.uid = this.uid
      const data = this.NewTickets;
      this.database.createTickets(data)
      .subscribe(data => {
              console.log(data);          
      })
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando  !...',
  
    });
    await this.loading.present();
  
  }
  

}
