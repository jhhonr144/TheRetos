import { TicketsService } from './../../Services/tickets.service';
import { Tickets } from './../../model/Tickets';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { email: '', password: '' };

  NewTickets : Tickets ={
    id_tickets   :'',
    uid          :sessionStorage.getItem('uid'),
    date_creation:'29/09/2021',  
    date_update  :'29/09/2021',
    total_ticket :0,
    total_money  :0,
    state_ticket :'1',
  }
  submitted = false;

  constructor(
    public database: TicketsService,
    public router: Router,
    public userData: UserData,
    private AuthService: AuthService

  ) {}

  async onSignup(form: NgForm) {
    try{
      this.submitted = true;
     
  
      if (form.valid) {
        //this.userData.signup(this.signup.email);
        const user = await this.AuthService.register( this.signup.email, this.signup.password);
        
        if(user){
          //verificamos si el email esta verificado
          
          const IsEmailVerified = this.AuthService.IsEmailVerified(user)
          this.redirectUser(IsEmailVerified)
        }
       
        // this.router.navigateByUrl('/app/tabs/schedule');
      }
    }catch(error){console.log(error)}
   
  }
  saveTicket(){


    const data = this.NewTickets;
    data.id_tickets = this.database.createId()
    this.database.addTicket(data,data.id_tickets).then((_) => {
    } )

  }

  private redirectUser(IsEmailVerified:Boolean) : void{
    this.saveTicket();
    if(IsEmailVerified){
      this.router.navigate(['/app/tabs/create'])


    }else{
      this.router.navigate(['verify-email'])
    }
 
  }
}
