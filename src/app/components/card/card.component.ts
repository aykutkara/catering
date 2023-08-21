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

  data!: ICatering;

  constructor(private cateringService: CateringService) {

  }
  ngOnInit() {
    this.cateringService.getData(this.inputData['voteId']).then((doc) => {
      this.data = doc.data() as ICatering
    });
  }

}
