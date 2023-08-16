import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../interfaces/catering.interface";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CateringService {

  item$!: Observable<ICatering[]>;
  firestore: Firestore = inject(Firestore);

  constructor() {

  }

  getData(): Observable<ICatering[]>{
    const itemCollection = collection(this.firestore, 'selections');
    return this.item$ = collectionData(itemCollection) as Observable<ICatering[]>;

  }



  async addData(data:ICatering) {

    await addDoc(collection(this.firestore, 'selections'), data);

  }
  async deleteData(id:number) {

    const docId = id.toString();
    await deleteDoc(doc(this.firestore, 'selections', docId));

  }



}
