import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: UserOptions = { email: '', password: '' };
  submitted = false;
  loading :any;

  constructor(
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
      this.router.navigate(['verify-email'])
    }
 
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando  !...',
  
    });
    await this.loading.present();
  
  }
  
}
