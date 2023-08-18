import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  activePage!:string;
  isLogin:boolean=true;

  constructor(private router:Router,private authService:AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activePage=event.url;
        if (this.activePage == '/login' || this.activePage == '/register' || this.activePage == '/') {
          this.isLogin = false;
        }
      }
    });

  }
  ngOnInit() {

  }
  logout() {
    this.authService.logout();
  }
}
