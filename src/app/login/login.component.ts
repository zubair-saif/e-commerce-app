import { ProductDataService } from './../services/product-data.service';
import { catchError } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { SocialUser } from 'angularx-social-login';
// import { Socialusers } from '../models/social-users.model';
import { SocialLoginService } from '../services/social-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  response;
  socialusers: SocialUser;
  loginForm: FormGroup;
  loggedIn: string = "";
  isLoading:boolean = false;

  constructor(public OAuth: SocialAuthService,
    private SocialloginService: SocialLoginService,
    private router: Router,
    private fb: FormBuilder,
    private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.initForm();
    console.log("working");

    this.loggedIn = localStorage.getItem('socialusers');
    console.log(this.loggedIn);

    if (this.loggedIn !== null) {
      this.router.navigate(['/shop']);
      this.productDataService.isLoggedIn.next(true);
    }
    


  }

  public socialSignIn(socialProvider: string) {
    this.isLoading = true;
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then((response: SocialUser) => {
      //    console.log(socialProvider, socialusers);
      console.log(response);
      this.productDataService.isLoggedIn.next(true);
      this.Savesresponse(response);
      this.isLoading = false;
    });


  }

  initForm() {

    this.loginForm = this.fb.group({
      userName: new FormControl(null),
      password: new FormControl(null)
    });
  }
  Savesresponse(socialuser: SocialUser) {
    this.SocialloginService.savesResponse(socialuser).subscribe((res: any) => {
      console.log(res);
      this.socialusers = res;
      this.response = res.userDetail;
      localStorage.setItem('socialusers', JSON.stringify(this.socialusers));
      // console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));
      this.router.navigate(['/shop']);
    }, error => {
      console.log(error);
    })
  }

}
