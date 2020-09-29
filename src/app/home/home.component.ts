import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Socialusers } from '../models/social-users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  socialusers: SocialUser;
  loggedIn: boolean = false;
  constructor(public OAuth: SocialAuthService, private router: Router) { }

  ngOnInit(): void {

    this.OAuth.authState.subscribe((user) => {
      this.socialusers = user;
      if(user !== null){
        this.loggedIn = true;
      }
      
    });
    

    this.socialusers = JSON.parse(localStorage.getItem('socialusers'));
    console.log(this.socialusers);

    if(this.socialusers !== null){
      this.loggedIn = true;
    }

    console.log(this.loggedIn);
    
  }

 

}
