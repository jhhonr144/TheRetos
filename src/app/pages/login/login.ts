
import { Users } from './../../model/user.interfase';
import { AuthService } from './../../Services/auth.service';
import { Component, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Tickets } from '../../model/Tickets';
import { TicketsService } from '../../Services/tickets.service';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class LoginPage {
  public tickets$: Observable<Tickets>
 
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  loading :any;
  uid : string

  NewTickets : Tickets ={
    total_money: 0,
    date_creation:'',
    hour_creation:'',
    date_update:'',
    total_ticket: 0,
    ticket_money: 0,
    uid: 'aaa',
    state_ticket: '1',
    state_register: 1
  }
  tickets = [];

  constructor(
    public database: TicketsService,
    private storage: Storage,
    public loadingController: LoadingController,
    public userData: UserData,
    public router: Router,
    private AuthService : AuthService,

  ) { }


  async onLogin(form: NgForm) {
    this.submitted = true;
    try{

      if (form.valid) {
        this.presentLoading();
       
        const user = await this.AuthService.login( this.login.email, this.login.password);

       if(user){
         //CheckEmail
         this.uid = user.uid
         console.log("uid "+ this.uid)
      
         const IsEmailVerified = this.AuthService.IsEmailVerified(user)
         this.redirectUser(IsEmailVerified)
      }

      
      }
    }catch(error){
 
      console.log(error)
    }
    this.loading.dismiss();
  }

  //login con google
  async onLoginGoogle(form: NgForm) {    
    try{     
      //  this.userData.login(this.login.email);
        const user = await this.AuthService.loginGoogle();
       if(user){   
        this.uid = user.uid

        // this.slcTicket(user.uid)
         //CheckEmail
         const IsEmailVerified = this.AuthService.IsEmailVerified(user)
         this.redirectUser(IsEmailVerified)
      }
      
    }catch(error){
      console.log(error)
    }
  }


  //cerrar sesion
  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  //redireccionar usuario si esta verificado o no
  private redirectUser(IsEmailVerified:Boolean) : void{
    if(IsEmailVerified){
 
      this.router.navigate(['/app/tabs/challenges'])
      
    }else{
      this.saveTicket()
      this.router.navigate(['verify-email'])
    }
  }



  //crear un tickete si el usuario entra a registrarse directamente de google 
  saveTicket(){
    let date: Date = new Date();
    this.NewTickets.date_creation= date.toLocaleDateString()   
    this.NewTickets.hour_creation= date.toLocaleTimeString()
    this.NewTickets.uid = this.uid

 
      const data = this.NewTickets;
      this.database.createTickets(data)
      .subscribe(data => {
              
      })
  }
  //selecciona el tickete del usuario que ingreso
  slcTicket(uid){  
      this.database.getTickets(uid)
      .subscribe(data => {
         
      },
      err => console.log('HTTP Error', err),)
  }

  


  //auxiliar loding 
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando  !...',
  
    });
    await this.loading.present();
  
  }
  
}
