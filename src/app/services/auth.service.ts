import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth:AngularFireAuth,private router: Router,private userService: UserService) { }

  login(email:string,password:string){
    this.fbAuth.signInWithEmailAndPassword(email,password).then((data)=>{
      console.log(data.user?.uid)
      this.router.navigate(['/home']).then();
    },
      (error)=>{
      alert(error.message);
      this.router.navigate(['/login']).then();
    });
  }

   register(email:string,password:string,name:string,lastname:string){
      this.fbAuth.createUserWithEmailAndPassword(email,password).then((userCredential)=>{
        userCredential.user?.updateProfile({
          displayName:name,
        })
        this.router.navigate(['/home']).then();
        this.userService.addUser(userCredential.user!.uid,email,password,name,lastname).then();
     },
     (error)=>{
        alert(error.message);
        this.router.navigate(['/register']).then();
     });
  }

  logout(){
    this.fbAuth.signOut().then(()=>{
      this.router.navigate(['/login']).then();
    });
  }
}
