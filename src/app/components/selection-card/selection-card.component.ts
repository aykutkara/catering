import {Component, Input, OnInit} from '@angular/core';
import {ICatering} from "../../interfaces/catering.interface";
import {CateringService} from "../../services/catering.service";

@Component({
  selector: 'app-selection-card',
  templateUrl: './selection-card.component.html',
  styleUrls: ['./selection-card.component.scss']
})
export class SelectionCardComponent implements OnInit{



  @Input() inputData!: any ;
  @Input() isActive: boolean|undefined;

  data!: ICatering;

  constructor(private cateringService: CateringService) {}

  ngOnInit(): void {
    this.cateringService.getData(this.inputData['voteId']).then((doc) => {
      this.data = doc.data() as ICatering
    });


  }



}
