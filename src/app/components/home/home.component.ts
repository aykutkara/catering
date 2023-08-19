import {Component,OnInit, } from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../../interfaces/catering.interface";
import {CateringService} from "../../services/catering.service";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {VotesService} from "../../services/votes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  catering$: Observable<ICatering[]>;
  users$: any[] | undefined;

  selectedCard:any|undefined;
  selectedCards:any[] = [];

  isVote:boolean = false;
  isAdmin:boolean = false;

  isComplate:boolean = false;

  selectCount:number=0;
  selectedCheckBoxes:any[] = [];

  user: any = null;
  userData: any =null;

  voteCards:any[] = [];
  activeVote:any;

  userUsedVote:boolean = false;
  constructor(private cateringService: CateringService,
              private userService:UserService,
              private afAuth: AngularFireAuth,
              private votesService: VotesService,
              private router: Router) {

    this.catering$ = this.cateringService.getDatas();
    this.votesService.getVotes().subscribe(data => {
      data.map(item => {
        if (item.isActive === true){
          this.activeVote = item;
          console.log(this.activeVote);
          this.isVote = true;
          this.voteCards= Object.values(item.options);
          console.log(this.voteCards);
        }
      });
    });
    this.userService.getUsers().subscribe(data => {
      this.users$ = data;
    });
  }

  ngOnInit():void {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.user = user;
        this.userService.getUserData(this.user.uid).then((doc) => {
          this.userData = doc;
          console.log(this.userData);
          if (this.userData.userType === 'admin'){
            this.isAdmin = true;
          }
          if (this.userData.isCurrentVoteUsed === true){
            this.userUsedVote = true;
          }
        });
      }
    });

    const date = new Date();
    this.shortDate(date);

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
   selectCard(card:any): void {
    this.selectedCard = card;
  }

  async onVote(): Promise<void> {
    if (this.selectedCard === undefined){
      alert("Lütfen seçim yapınız.");
    }
    else {
      await this.router.navigateByUrl('/active-voting');
      this.selectedCard['voteCount']++;
      const selectedCardId = this.selectedCard['voteId'];
      const currentUserPastVotes = this.userData.pastVotes;
      const newPostVote = {
        votingId: this.activeVote.firebaseId,
        myVote: selectedCardId
      }
      currentUserPastVotes.push(newPostVote);
      const votingData = {
        option1: {
          voteCount: this.activeVote.options['option1'].voteCount,
          voteId:this.activeVote.options['option1'].voteId
        },
        option2: {
          voteCount: this.activeVote.options['option2'].voteCount,
          voteId:this.activeVote.options['option2'].voteId
        },
        option3: {
          voteCount: this.activeVote.options['option3'].voteCount,
          voteId:this.activeVote.options['option3'].voteId
        },
      }
      const userData = {
        isCurrentVoteUsed: true,
        pastVotes: currentUserPastVotes
      }
      await this.votesService.updateData(this.activeVote.firebaseId, {options : votingData});
      await this.userService.updateUser(this.user.uid, userData);
      console.log(this.activeVote.options);
      console.log(this.selectedCard);
      this.userUsedVote = true;
    }
  }

  resetModal() {
      this.selectedCheckBoxes.forEach((checkbox: any) => {
        checkbox.checked = false;
      });
      this.selectCount=0;
      this.isComplate = false;

  }
  async startVote() {
    const newVoteData = {
      isActive: true,
      startDate: new Date(),
      endDate: null,
      options:{
        option1: {
          voteCount: 0,
          voteId: this.selectedCards[0].firebaseId
        },
        option2: {
          voteCount: 0,
          voteId: this.selectedCards[1].firebaseId
        },
        option3: {
          voteCount: 0,
          voteId: this.selectedCards[2].firebaseId
        }
      },
      winnerId: null
    };
    await this.votesService.addVote(newVoteData);
    this.resetModal();
    this.userUsedVote = false;
  }

  async endVote() {
    this.users$?.forEach( (user) => {
      this.userService.updateUser(user.firebaseId, {isCurrentVoteUsed: false})
    });
    const endDate = new Date();
    await this.votesService.updateData(this.activeVote.firebaseId, {isActive: false, endDate: endDate});
    let maxVoteCount = -1;
    let winnerId!:string;
    for (const optionKey in this.activeVote.options) {
      const option = this.activeVote.options[optionKey];
      if (option.voteCount > maxVoteCount) {
        maxVoteCount = option.voteCount;
        winnerId = option.voteId;
      }
    }
    await this.votesService.updateData(this.activeVote.firebaseId, {winnerId: winnerId});

    this.cateringService.getData(winnerId).then((doc) => {
      if (doc.exists()) {
        let lastDateArray = doc.data()['lastDistribution']?doc.data()['lastDistribution']:[];
        lastDateArray.push(this.shortDate(endDate));
        if (doc.data()['maxVotes'] < maxVoteCount){
          this.cateringService.updateData(winnerId, {maxVotes: maxVoteCount,lastDistribution: lastDateArray});
        }
        else{
          this.cateringService.updateData(winnerId, {lastDistribution: lastDateArray});
        }
      }
      else {
        console.log("Bu id ye sahip bir id bulunamadı.");
      }
    });
    this.isVote = false;
    this.selectedCards = [];
    this.userUsedVote = false;
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
      //edit işlemlerini yapacağım.
    }
  }

  shortDate(date:Date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const dayName = date.toLocaleString('default', { weekday: 'long' });

    return `${day} ${month} ${year} ${dayName}`;
  }
}
