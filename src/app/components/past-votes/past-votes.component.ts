import { Component } from '@angular/core';
import {VotesService} from "../../services/votes.service";

@Component({
  selector: 'app-past-votes',
  templateUrl: './past-votes.component.html',
  styleUrls: ['./past-votes.component.scss']
})
export class PastVotesComponent {

  pastVoteCards:any[] = [];
  isPastVotes:boolean = false;

  constructor(private votesService: VotesService) {
    this.votesService.getVotes().subscribe(data => {
      data.map(item => {
        if (item.isActive === false){
          this.isPastVotes = true;
          this.pastVoteCards.push(Object.values(item.options));
          console.log(this.pastVoteCards)
        }
      });
    });
  }

}
