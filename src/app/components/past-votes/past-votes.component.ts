import {Component, OnInit} from '@angular/core';
import {VotesService} from "../../services/votes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-votes',
  templateUrl: './past-votes.component.html',
  styleUrls: ['./past-votes.component.scss']
})
export class PastVotesComponent implements OnInit{

  pastVoteCards:any[] = [];
  pastVoteCardsOptions:any[] = []
  isPastVotes:boolean = false;

  constructor(private votesService: VotesService) {}

  ngOnInit() {
    this.votesService.getVotes().subscribe(data => {
      console.log(data);
      data.map(item => {
        if (item.isActive === false){
          this.pastVoteCards.push(item);
          this.isPastVotes = true;
          this.pastVoteCardsOptions.push(Object.values(item.options));
        }
      });
    });
  }



  shortDate(timestamp: any) {
    const seconds = timestamp.seconds;
    const milliseconds = timestamp.nanoseconds / 1000000;
    const newDate = new Date(seconds * 1000 + milliseconds);

    const day = newDate.getDate();
    const month =newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
    const dayName = newDate.toLocaleString('default', { weekday: 'long' });

    return `${day} ${month} ${year} ${dayName}`;
  }

}
