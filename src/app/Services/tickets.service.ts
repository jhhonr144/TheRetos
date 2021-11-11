import { Users } from './../model/user.interfase';
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
  hour_creation:string;
  date_update:string;
  total_ticket: number;
  ticket_money: number;
  uid: string;
  state_ticket: string;
  state_register : number; }

  

@Injectable({
  providedIn: 'root'
})

export class TicketsService {

  public tickets$: Observable<Tickets>

  private bdChallengs = 'Tickets';
  private baseUrl = environment.baseUrl + "/tickets";
  private baseUrl2 = environment.baseUrl + "/tickets/get/";


  constructor( public Firestore: AngularFirestore,private http: HttpClient) { 
    
  }


  createId(){
   return this.Firestore.createId();
  }
  

  getChallengs<tipo>():Observable<tipo[]>{
    const ref = this.Firestore.collection<tipo>(this.bdChallengs);
    return ref.valueChanges();
  }

  //using backend
  createTickets(tickets: CreateTicketRequest) {
    return this.http.post(`${this.baseUrl}`, tickets)
  }

  getTickets(tickets: String ) {
   // this.tickets$ =  this.Firestore.doc<Tickets>(`users/${tickets}`).valueChanges();
   
    return this.http.get(`${this.baseUrl2}${tickets}`)
  }

  




}
