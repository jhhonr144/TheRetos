import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth,){ }

  private checkRole(route: ActivatedRouteSnapshot, role: string): boolean{
    return route.data.roles && role && route.data.roles.some((r) => r == role) ? true: false;
  }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const role = sessionStorage.getItem('role');
      if( !role ) {
        this.afAuth.currentUser.then(currentUser => {
          currentUser.getIdTokenResult().then(idTokenResult => {
            sessionStorage.setItem('role', idTokenResult.claims.role);
            return this.checkRole(next, idTokenResult.claims.role);       
          })
        });
      }
      else 
        return this.checkRole(next, role);
  }
  
}
