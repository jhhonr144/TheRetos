import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { map, take } from 'rxjs/operators';

import { UserData } from '../../providers/user-data';
import { AuthService } from '../../Services/auth.service';



@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage implements OnInit {
  username: string;
  email:string;
  dates : any

  constructor(private AuthSvc: AuthService,
     public router: Router,
  ) { }
  ngOnInit(): void {
  this.DateUSer()
  this.UserDates();
  }
  
  DateUSer(){

    this.AuthSvc.user$.subscribe(
      datos => {
        this.dates = datos
        this.username = datos.displayName
        this.email = datos.email  
    }
    );
   
  }
  
  resetPassword(){
    this.router.navigate(['/forgot-password']);
  }

  logout(){
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

      console.log('este es el id '+ uid)
    }
  }

}
