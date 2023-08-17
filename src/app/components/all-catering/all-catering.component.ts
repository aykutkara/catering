import {Component, OnInit} from '@angular/core';
import {CateringService} from "../../services/catering.service";
import {ICatering} from "../../interfaces/catering.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateForm";
import {addWarning} from "@angular-devkit/build-angular/src/utils/webpack-diagnostics";
import {identity} from "rxjs";

@Component({
  selector: 'app-all-catering',
  templateUrl: './all-catering.component.html',
  styleUrls: ['./all-catering.component.scss']
})
export class AllCateringComponent implements OnInit{

  allCatering:ICatering[] | undefined;
  cateringForm: FormGroup | any;
  selectedCatering: any;
  constructor(private cateringService: CateringService,private fb: FormBuilder) {
    this.cateringService.getData().subscribe(data => {
      this.allCatering = data;
    });
  }
  ngOnInit(): void {
    this.initForm();
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
}
