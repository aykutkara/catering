import {Component, inject, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../../interfaces/catering.interface";
import {CateringService} from "../../services/catering.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  catering$: Observable<ICatering[]>;

  selectedCard:ICatering|undefined;

  // @ts-ignore
  @ViewChildren('radioButton') radioButtons: QueryList<any>;

  //newDate = new Date();
  constructor(private cateringService: CateringService) {
    this.catering$ = this.cateringService.getData();
  }

  ngOnInit(): void {

  }
  selectCard(card: ICatering): void {
    this.selectedCard = card;
  }
  vote(): void {
    if (this.selectedCard === undefined){
      alert("Lütfen seçim yapınız.");
    }
    else {
      console.log(this.selectedCard);

    }
  }

}
