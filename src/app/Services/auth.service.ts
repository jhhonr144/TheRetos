import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Users } from './../model/user.interfase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ : Observable<Users>


  constructor(public afAuth:AngularFireAuth, private afs:AngularFirestore,private router: Router,private alertCtrl: AlertController) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if(user){
          return this.afs.doc<Users>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
    
   }
 
  //cambiar contraseña olvidada
  async resetPassword(email:string):  Promise<void>{
    try{
      return this.afAuth.sendPasswordResetEmail(email)
     }catch(error){
     console.log('Error-->', error);
    } 
  }

  //login con google
  async loginGoogle():  Promise<Users>{
    try{
      const {user} = await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      //enviar correo de verificacion     
      await this.sendVerificationEmail();
      return user;
    }catch(error){
     console.log('Error-->', error);
    } 
  }

//registro correo
  async register(email:string, password:string):  Promise<Users>{
    try{
      const {user} = await this.afAuth.createUserWithEmailAndPassword(email,password);
      //enviar correo de verificacion     
      await this.sendVerificationEmail();
      return user;
    }catch(error){
     console.log('Error-->', error);
    } 
  }
  
  async sendVerificationEmail():  Promise<void>{
    try{
      //cuando se registra nuestro usuario enviar un correo 
     return (await this.afAuth.currentUser).sendEmailVerification()
    }catch(error){
     console.log('Error-->', error);
    } 
  }

  IsEmailVerified(user: Users): Boolean{
    return user.emailVerified === true ? true : false;
  }




  //login normal
  async login(email:string,password:string):  Promise<Users>{
      try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email,password);
      this.updateUserData(user);
      return user;
    }catch(error){

      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {        
        this.showAlert('Opps','','Su Contraseña es Incorrecta')
     } 
     if (errorCode === 'auth/user-not-found') {        
      this.showAlert('Opps !','','No hay ningún registro de usuario que corresponda a este identificador. Es posible que se haya eliminado al usuario.')
   } 

   if (errorCode === 'auth/invalid-email') {        
    this.showAlert('Opps !','','The email address is badly formatted.')
 } 
 if (errorCode === 'auth/too-many-requests') {        
  this.showAlert('Opps !','','Access to this account has been temporarily disabl…setting your password or you can try again later')
} 

if (errorCode === 'auth/network-request-failed') {        
  this.showAlert('Opps !','','Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).')
} 
 
 





     console.log('Error-->', error);
    } 
  }

  async showAlert(header: string,subHeader: string,message: string) {  
    const alert = await this.alertCtrl.create({  
      header: header,  
      subHeader: subHeader,  
      message: message,  
      buttons: ['OK']  
    });  
    await alert.present();  
    const result = await alert.onDidDismiss();  
    console.log(result);  
  }  




  //salir 
  async logout(): Promise<void>{
    try{
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    }catch(error){
     console.log('Error-->', error);
    }
  }

  private updateUserData(user:Users){
    //leer documento con el id del cual este logueado
    const userRef : AngularFirestoreDocument<Users> = this.afs.doc(`users/${user.uid}`)
    const data: Users={ 
      uid:user.uid,
      email:user.email,
      emailVerified:user.emailVerified,
      displayName:user.displayName
    }
    return userRef.set(data,{merge :true})

  }




}
 