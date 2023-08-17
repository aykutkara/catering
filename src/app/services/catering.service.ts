import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../interfaces/catering.interface";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {update} from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class CateringService {

  item$!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {

  }

  getData(): Observable<any[]>{
    const itemCollection = collection(this.firestore, 'selections');
    console.log(collectionData(itemCollection))
    return this.item$ = collectionData(itemCollection, { idField: 'firebaseId' });

  }

  async addData(data:ICatering) {
    await addDoc(collection(this.firestore, `selections`), data);
  }

  async deleteData(id:string) {
    await deleteDoc(doc(this.firestore, 'selections', id));
  }

  async updateData(id:string, data:any) {
    await updateDoc(doc(this.firestore, 'selections', id), data);
  }




}
