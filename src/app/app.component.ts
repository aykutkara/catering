import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  activePage!:string;
  isLogin:boolean=true;
  userData:any;
  constructor(private router:Router,private authService:AuthService,
              private afAuth: AngularFireAuth,
              private userService:UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePage=event.url;
        console.log(this.activePage);
        if (this.activePage == '/login' || this.activePage == '/register' || this.activePage == '/') {
          //this.isLogin = false;
        }
      }
    });

  }
  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userService.getUserData(user.uid).then((doc) => {
          this.userData = doc;
        });
      }
    });
  }


  logout() {
    this.authService.logout();
  }
}
