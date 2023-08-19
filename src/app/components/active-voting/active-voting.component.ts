import { Component } from '@angular/core';
import {VotesService} from "../../services/votes.service";

@Component({
  selector: 'app-active-voting',
  templateUrl: './active-voting.component.html',
  styleUrls: ['./active-voting.component.scss']
})
export class ActiveVotingComponent {
  activeVote:any;
  voteCards:any[] = [];
  isActiveVote:boolean = false;
  constructor(private votesService: VotesService) {
    this.votesService.getVotes().subscribe(data => {
      data.map(item => {
        if (item.isActive === true){
          this.isActiveVote = true;
          this.activeVote = item;
          console.log(this.activeVote)
          this.voteCards= Object.values(item.options);
        }
      });
    });
  }

}
