import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../interfaces/catering.interface";
import {collection, collectionData, doc, Firestore, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CateringService {

  item$!: Observable<ICatering[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private fireStore: Firestore) {

  }

  getData(): Observable<ICatering[]>{
    const itemCollection = collection(this.firestore, 'selections');
    return this.item$ = collectionData(itemCollection) as Observable<ICatering[]>;

  }




}
