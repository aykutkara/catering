import {Component,OnInit, } from '@angular/core';
import {Observable} from "rxjs";
import {ICatering} from "../../interfaces/catering.interface";
import {CateringService} from "../../services/catering.service";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {VotesService} from "../../services/votes.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  catering$: Observable<ICatering[]>;

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
  constructor(private cateringService: CateringService,
              private userService:UserService,
              private afAuth: AngularFireAuth,
              private votesService: VotesService) {

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
        });
      }
    });
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
      this.selectedCard['voteCount']++;
      console.log(this.activeVote.options)
      //await this.votesService.updateData(this.activeVote.firebaseId, "d");
      console.log(this.selectedCard);

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
  }

  async endVote() {
    const endDate = new Date();
    await this.votesService.updateData(this.activeVote.firebaseId, {isActive: false, endDate: endDate});
    this.isVote = false;
    this.selectedCards = [];
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
}
