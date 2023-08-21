import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {VotesService} from "../../services/votes.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  userData: any =null;
  userPastVotes: any =null;
  userAttendedVotes: any[] = [];
  userAttendedVotesOptions: any[] = [];
  constructor(private userService : UserService,private afAuth: AngularFireAuth,
              private votesService: VotesService) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userService.getUserData(user.uid).then((doc) => {
          this.userData = doc;
          this.userPastVotes = this.userData.pastVotes? this.userData.pastVotes : null;
          console.log(this.userPastVotes);
          this.votesService.getVotes().subscribe(data => {
            if (data) {
              data.map(item => {
                this.userPastVotes.map((item2: any) => {
                  if (item.firebaseId === item2.votingId) {
                    this.userAttendedVotes.push(item);
                    console.log(this.userAttendedVotes);
                    this.userAttendedVotesOptions.push(Object.values(item.options));
                    console.log(this.userAttendedVotesOptions);
                  }
                });
              });
            }

          });
        });
      }
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
