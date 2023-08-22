import {Component, Input, OnInit} from '@angular/core';
import {ICatering} from "../../interfaces/catering.interface";
import {CateringService} from "../../services/catering.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  @Input() inputData!: any ;
  @Input() winnerId!: any;
  data: ICatering | undefined;
  isWinner: boolean = false;

  constructor(private cateringService: CateringService) {

  }
  ngOnInit() {
    this.cateringService.getData(this.inputData['voteId']).then((doc) => {
      this.data = doc.data() as ICatering
    });
    this.cateringService.getData(this.winnerId).then((doc) => {
      if (doc.exists()) {
        if (doc.data()['firebaseId'] == this.inputData['voteId']) {
          this.isWinner = true;
        }
      }
    });
  }


}
