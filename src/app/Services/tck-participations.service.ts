
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export type CreateParticipation = { 
  id?: string;
  id_Challenges :string;
  uid: string;
  total_ticket: number;
  date_Participate:string; 
  hour_Participate:string;
  state_Participate: string;
  answer : string
  number_participate : number; }

  export type Participate = { 
    uid : string,
    id_Challenges :string
   }
   
  export type detail = { 
    id_Challenges :string
   }



@Injectable({
  providedIn: 'root'
})


export class TckParticipationsService {
 
  private baseUrl = environment.baseUrl + "/participe";


  constructor( public Firestore: AngularFirestore,private http: HttpClient) { }

  //using backend
  createParticipate(Participate: CreateParticipation) {
    return this.http.post(`${this.baseUrl}`, Participate)
  }

    //using backend
    validationParticipate(Participate: Participate) {
      
      return this.http.post(`${this.baseUrl}/participate`, Participate)
    }

        //using backend
    Details(id_Challenges: detail) {
      return this.http.post(`${this.baseUrl}/details`, id_Challenges)
    }
            //using backend
    ViewDetails(id_Challenges: detail) {
    return this.http.post(`${this.baseUrl}/view`, id_Challenges)
  }

  



}
