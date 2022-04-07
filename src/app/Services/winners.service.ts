import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type Participate = { 
  id_Challenges : string,
  uids :Object
 }

@Injectable({
  providedIn: 'root'
})
export class WinnersService {
  private baseUrl = environment.baseUrl + "/award";

  constructor( public Firestore: AngularFirestore,private http: HttpClient) { }
    //using backend
    validationaWard(Participate: Participate) {
      console.log(Participate);
      return this.http.post(`${this.baseUrl}`, Participate)
    }
}
