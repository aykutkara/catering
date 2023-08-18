import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ICatering} from "../interfaces/catering.interface";

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  voting$!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);
  constructor() { }
  getVotes(): Observable<any[]>{
    const itemCollection = collection(this.firestore, 'voting');
    return this.voting$ = collectionData(itemCollection, { idField: 'firebaseId' });
  }
  async addVote(data:any) {
    await addDoc(collection(this.firestore, `voting`), data);
  }
  async updateData(id:string, data:any) {
    await updateDoc(doc(this.firestore, 'voting', id), data);
  }
}
