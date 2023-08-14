import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fbAuth:AngularFireAuth) { }

  signIn(email:string,password:string){
    return this.fbAuth.signInWithEmailAndPassword(email,password);
  }

  signUp(email:string,password:string){
    return this.fbAuth.createUserWithEmailAndPassword(email,password);
  }

  logout(){
    this.fbAuth.signOut().then();
  }
}
