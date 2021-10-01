
import { Users } from './../model/user.interfase';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {
 user$: Observable<Users> = this.AuthService.afAuth.user;
  constructor(private AuthService: AuthService) { }

  async onResend(){
    try{
     await this.AuthService.sendVerificationEmail();
    }catch(error){
   console.log('Error', error)
    }
  
  }

  ngOnDestroy(){
    this.AuthService.logout()
  }
}
