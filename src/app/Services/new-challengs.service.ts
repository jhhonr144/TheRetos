import { Challengs } from './../model/challengs.model';
import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NewChallengsService {
  private bdChallengs = 'Challenges';
  private baseUrl = environment + "/Challengs"; 

  constructor( public Firestore: AngularFirestore,private http: HttpClient) { }


  createId(){
   return this.Firestore.createId();
  }
  addChallengs(challengs: any,id_challengs : string): Promise<any>{
    return this.Firestore.collection(this.bdChallengs).doc(id_challengs).set(challengs);
  }

//Challenges

  getChallengs<tipo>():Observable<tipo[]>{
    const re = this.Firestore.collection<tipo>(this.bdChallengs, ref => ref.where('state_game', '!=', "1"));
    return re.valueChanges();
  }
}
