import { AuthService } from './../Services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthSvc: AuthService,private router : Router){}
  
    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | 
    UrlTree {
    return this.AuthSvc.user$.pipe(

     take(1),
     map(user =>{

          if(user){
            return true;
          }else{
            this.router.navigate(['/login']);
            return false
          }
     })
    );
  }
  
}
