import { Component, OnInit } from '@angular/core';
import { UserData } from '../../providers/user-data';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';


import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    public router: Router,
    public userData: UserData,
    private AuthService : AuthService

  ) { }
  

  ngOnInit() {
  }

  async onResetPassword(email){
    try{

 
       // this.userData.login(this.login.email);
        await this.AuthService.resetPassword(email.value);
        this.router.navigate(['/login'])
  
    }catch(error){
      console.log(error)
    }
  }
}
