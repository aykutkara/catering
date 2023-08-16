import {Component, Input} from '@angular/core';
import {ICatering} from "../../interfaces/catering.interface";

@Component({
  selector: 'app-selection-card',
  templateUrl: './selection-card.component.html',
  styleUrls: ['./selection-card.component.scss']
})
export class SelectionCardComponent {


  @Input() data!: ICatering ;
  @Input() isActive: boolean|undefined;
  constructor() {

  }
}
