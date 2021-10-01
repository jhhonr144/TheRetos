import { Tickets } from './../model/Tickets';
import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private bdChallengs = 'Tickets';


  constructor( public Firestore: AngularFirestore,private http: HttpClient) { }


  createId(){
   return this.Firestore.createId();
  }
  addTicket(tickets: any,id_tickets : string): Promise<any>{
    return this.Firestore.collection(this.bdChallengs).doc(id_tickets).set(tickets);
  }

//Challenges

  getChallengs<tipo>():Observable<tipo[]>{
    const ref = this.Firestore.collection<tipo>(this.bdChallengs);
    return ref.valueChanges();
  }
}
