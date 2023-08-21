import {Component, Input, OnInit} from '@angular/core';
import {CateringService} from "../../services/catering.service";
import {ICatering} from "../../interfaces/catering.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateForm";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {identity} from "rxjs";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {style} from "@angular/animations";

@Component({
  selector: 'app-all-catering',
  templateUrl: './all-catering.component.html',
  styleUrls: ['./all-catering.component.scss']
})
export class AllCateringComponent implements OnInit{

  allCatering:ICatering[] | undefined;
  cateringForm: FormGroup | any;
  selectedCatering: any;
  isAdmin:boolean = false;
  user: any = null;
  userData: any =null;

  searchText:string = '';
  searchCatering: ICatering[]|undefined = [];
  constructor(private cateringService: CateringService,private fb: FormBuilder,private userService:UserService,private aFauth: AngularFireAuth) {
    this.cateringService.getDatas().subscribe(data => {
      this.allCatering = data;
      this.updateSearchCatering();
      this.getNewestCatering();
    });

  }
  ngOnInit(): void {
    this.initForm();
    this.aFauth.authState.subscribe(user => {
      if(user) {
        this.user = user;
        this.userService.getUserData(this.user.uid).then((doc) => {
          this.userData = doc;
          if (this.userData.userType === 'admin'){
            this.isAdmin = true ;
          }
        });
      }
    });
  }

  onSearchTextChange(): void {
    this.updateSearchCatering();
  }
  initForm() {
    this.cateringForm = this.fb.group({
      name: ['',Validators.required],
      image: ['',Validators.required],
    })
  }

  closeModal() {
    this.selectedCatering = undefined;
    this.initForm();
  }


  async saveCatering() {
    if (this.selectedCatering !== undefined) {
      if (this.cateringForm.valid) {
        this.selectedCatering.name = this.cateringForm.value.name;
        this.selectedCatering.image = this.cateringForm.value.image;
        await this.cateringService.updateData(this.selectedCatering.firebaseId, this.selectedCatering);
        this.selectedCatering = undefined;
        this.initForm();
      }
      else {
          this.cateringForm.markAllAsTouched();
      }
    }
    else {
      if (this.cateringForm.valid) {
        let lastId ;
        this.allCatering!==undefined?lastId = this.allCatering.length:lastId=0;
        const newCatering: ICatering = {
          id: lastId + 1,
          name: this.cateringForm.value.name,
          image: this.cateringForm.value.image,
          maxVotes: 0,
        }
        await this.cateringService.addData(newCatering);
        this.initForm();
      }
      else {
        this.cateringForm.markAllAsTouched();
      }
    }

  }

   async deleteCatering(item: any) {
    console.log(item.id)
    await this.cateringService.deleteData(item.firebaseId);

  }

  updateCatering(item: ICatering) {
    this.selectedCatering = item;
    this.cateringForm.patchValue({
      name: this.selectedCatering.name,
      image: this.selectedCatering.image,
    })
  }
  updateSearchCatering() {
    this.searchCatering = this.allCatering?.filter(item => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
  getNewestCatering() {
    this.filterCatering('newest');
  }
  getOldestCatering() {
    this.filterCatering('oldest');
  }
  getLowToHighCatering() {
    this.filterCatering('LowToHigh');
  }
  getHighToLowCatering() {
    this.filterCatering('HighToLow');
  }
  filterCatering(sortType: string) {
    if (sortType === 'oldest') {
      // Tarihe göre sıralama (en eski en başta)
      this.searchCatering?.sort((a, b) => a.id - b.id);
    } else if (sortType === 'newest') {
      // Tarihe göre sıralama (en yeni en başta)
      this.searchCatering?.sort((a, b) => b.id - a.id);
    } else if (sortType === 'LowToHigh') {
      // Görüntülenme sayısına göre sıralama (azdan çoğa)
      this.searchCatering?.sort((a, b) => a.maxVotes - b.maxVotes);
    } else if (sortType === 'HighToLow') {
      // Görüntülenme sayısına göre sıralama (çoktan aza)
      this.searchCatering?.sort((a, b) => b.maxVotes - a.maxVotes);
    } else {
      // Filtre yoksa en yeniyi döndür
      this.searchCatering?.sort((a, b) => b.id - a.id);
    }
  }

  searchInputClear() {
    this.searchText = '';
    this.updateSearchCatering();
    this.getNewestCatering();
  }
}
