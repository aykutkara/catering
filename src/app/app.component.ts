import {Component, OnInit} from '@angular/core';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ICatering} from "./interfaces/catering.interface";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  item$: Observable<ICatering[]>;
  firestore: Firestore = inject(Firestore);
  constructor() {
    const itemCollection = collection(this.firestore, 'selections');
    console.log(itemCollection)
    this.item$ = collectionData(itemCollection) as Observable<ICatering[]>
  }
  ngOnInit() {


  }

}
