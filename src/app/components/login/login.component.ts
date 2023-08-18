import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateForm";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type:string = 'password';
  isText:boolean = false;
  eyeIcon:string = 'fa-eye-slash';
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,private authService : AuthService) {}
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

   onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Please fill all the required fields')
    }
  }

}
