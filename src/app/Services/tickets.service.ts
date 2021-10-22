import { Tickets } from './../model/Tickets';
import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type CreateTicketRequest = { 
  id?: string;
  total_money: number;
  date_creation:string; 
  date_update:string;
  total_ticket: number;
  uid: string;
  state_ticket: string; }

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
  private bdChallengs = 'Tickets';
  private baseUrl = environment.baseUrl + "/tickets";


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

  //using backend
  createTickets(tickets: CreateTicketRequest) {
    return this.http.post(`${this.baseUrl}`, tickets)
  }



}
