import { LoginPage } from './../login/login';
import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from '../../Services/auth.service';
import { Tickets } from '../../model/Tickets';

import { TicketsService } from '../../Services/tickets.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {

  username: string;
  email:string;
  dates : any
  tickets = [];


  constructor(private AuthSvc: AuthService,
     public router: Router,
     public LoginPage : LoginPage,

     public database: TicketsService,
  ) { }
  ngOnInit(): void {
  this.DateUSer()
  this.UserDates();

/*    this.ticketObservable.getTicket$().subscribe(ticket => {
   this.tickets = ticket
   console.log(this.tickets)
   });
 */

  }
  
  DateUSer(){

    this.AuthSvc.user$.subscribe(
      datos => {
        this.dates = datos
        this.username = datos.displayName
        this.email = datos.email  
        this.slcTicket(datos.uid)
    }
    );
   
  }
  
  resetPassword(){
    this.router.navigate(['/forgot-password']);
  }

  logout(){
    sessionStorage.removeItem('role');
    this.AuthSvc.logout();
    this.router.navigate(['/login']);
  }

  UserDates(){
    const user = firebase.default.auth().currentUser;
    if (user !== null) {


      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
    
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
   
    }
  }

  slcTicket(uid){  
    this.database.getTickets(uid)
    .subscribe(data => {
            // console.log(data);  
            this.tickets.push(data)
            // console.log(this.tickets)
       
    },
    err => console.log('HTTP Ticket', err),)
}


}
