import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Tickets } from '../../model/Tickets';
import { TicketsService } from '../../Services/tickets.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  loading :any;
  uid : string

  NewTickets : Tickets ={
    total_money: 0,
    date_creation:'',
    hour_creation:'',
    date_update:'',
    total_ticket: 5,
    uid: '',
    state_ticket: '1',
    state_register: 1
  }

  constructor(
    public database: TicketsService,
    private storage: Storage,
    public loadingController: LoadingController,
    public userData: UserData,
    public router: Router,
    private AuthService : AuthService
  ) { }


  async onLogin(form: NgForm) {
    this.submitted = true;
    try{

      if (form.valid) {
        this.presentLoading();
       
        const user = await this.AuthService.login( this.login.email, this.login.password);

       if(user){
         //CheckEmail
         this.storage.set('uid', user.uid);
         sessionStorage.setItem('uid', user.uid);

         this.uid = user.uid
      
         const IsEmailVerified = this.AuthService.IsEmailVerified(user)
         this.redirectUser(IsEmailVerified)
      }

      
      }
    }catch(error){
 
      console.log(error)
    }
    this.loading.dismiss();
  }

  async onLoginGoogle(form: NgForm) {
    
    try{
   
      
      //  this.userData.login(this.login.email);
        const user = await this.AuthService.loginGoogle();

       if(user){
         this.uid = user.uid
         //CheckEmail
         const IsEmailVerified = this.AuthService.IsEmailVerified(user)
         this.redirectUser(IsEmailVerified)
      }
      
    }catch(error){
      console.log(error)
    }
  }



  onSignup() {
    this.router.navigateByUrl('/signup');
  }


  private redirectUser(IsEmailVerified:Boolean) : void{
    if(IsEmailVerified){

      this.router.navigate(['/app/tabs/challenges'])
      
    }else{
      this.saveTicket()
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
