import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateForm";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  type:string = 'password';
  isText:boolean = false;
  eyeIcon:string = 'fa-eye-slash';
  signupForm!:FormGroup;
  constructor(private fb:FormBuilder,private authService : AuthService ) {
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

   onSignUp() {
    if(this.signupForm.valid){
      this.authService.register(this.signupForm.value.email,this.signupForm.value.password,
        this.signupForm.value.firstname,this.signupForm.value.lastname);

    }
    else{
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Please fill all the required fields')
    }
  }

}
