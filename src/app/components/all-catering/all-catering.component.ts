import {Component, OnInit} from '@angular/core';
import {CateringService} from "../../services/catering.service";
import {ICatering} from "../../interfaces/catering.interface";

@Component({
  selector: 'app-all-catering',
  templateUrl: './all-catering.component.html',
  styleUrls: ['./all-catering.component.scss']
})
export class AllCateringComponent implements OnInit{

  allCatering:ICatering[] | undefined;
  constructor(private cateringService: CateringService) {
    this.cateringService.getData().subscribe(data => {
      this.allCatering = data;
    });
  }
  ngOnInit(): void {

  }

}
