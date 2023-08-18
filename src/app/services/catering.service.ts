import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../interfaces/catering.interface";
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore, getDoc,
  updateDoc
} from "@angular/fire/firestore";
import {update} from "@angular/fire/database";


@Injectable({
  providedIn: 'root'
})
export class CateringService {

  items$!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {

  }

  getDatas(): Observable<any[]>{
    const itemCollection = collection(this.firestore, 'selections');
    return this.items$ = collectionData(itemCollection, { idField: 'firebaseId' });
  }
  getData(id:string){
    return getDoc(doc(this.firestore, 'selections', id));
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
