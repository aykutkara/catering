import {Component, ElementRef, inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
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
  selectedCards:ICatering[] = [];

  isVote:boolean = false;
  isAdmin:boolean = true;

  isComplate:boolean = false;

  selectCount:number=0;
  selectedCheckBoxes:any[] = [];


  constructor(private cateringService: CateringService) {
    this.catering$ = this.cateringService.getData();
  }

  ngOnInit(): void {

  }

  handleCheckboxChange(e:any,item:ICatering) {
    if (this.selectCount == 2){
      this.isComplate = true;
    }
    if (this.selectCount >= 3 && e.target.checked){
      e.target.checked = false;
      alert("En fazla 3 seçim yapabilirsiniz.");
      return;
    }
    else{
      if (e.target.checked){
        this.selectCount++;
        this.selectedCards.push(item);
        this.selectedCheckBoxes.push(e.target);
      }
      else{
        this.selectCount--;
        this.isComplate = false;
        this.selectedCards.length >0?this.selectedCards.pop():null;
        this.selectedCheckBoxes.length >0?this.selectedCheckBoxes.pop():null;
      }
    }
    console.log(this.isComplate)
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

  resetModal() {

      this.selectedCheckBoxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
      this.selectCount=0;
      this.isComplate = false;

  }
  startVote() {
    this.isVote = true;
    this.resetModal();
  }

  endVote() {
    this.isVote = false;
    this.selectedCards = [];
  }

  alertStartVote() {
    if (this.isVote){
      alert("Şuan geçerli bir oylama var. Yeni oylama için lütfen şuanki oylamayı bitiriniz.");
    }
    else{
      this.selectedCards = [];
    }
  }
  editVote() {
    if (this.selectedCards.length !== 0){
      //edit işlemlerini yapacağız.
    }
  }
}
