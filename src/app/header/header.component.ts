import { SocialLoginService } from './../services/social-login.service';

import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  count: number;
  unsub: Subscription;
  data: string;
  social: SocialUser;
  loggedIn: boolean  ;
  isLoading:boolean;

  constructor(private productDataService: ProductDataService, private oAuth: SocialAuthService, private router: Router, private socialLoginService: SocialLoginService) { }
  form: FormGroup;

  ngOnInit(): void {

    this.unsub = this.productDataService.totalItems.subscribe((value: number) => {
      this.count = value;
    });

    this.productDataService.searchInputChanged.subscribe((value) => {
      this.data = value;
    });

    this.productDataService.isLoggedIn.subscribe(value => {
      this.loggedIn = value;
    });
    

    // this.form = new FormGroup({
    //   search: new FormControl(null)
    // });

  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
    this.data = '';
  }

  dataChanged(event) {
    // console.log(event);
    this.productDataService.emitSearchInputChangesEvent(event);
  }

  logout() {
    this.isLoading = true;
    this.oAuth.signOut(true).then(data => {
      console.log(data);
      this.clearData();
     

    }).catch(e => {
      console.log(e);
      this.clearData();
    });
  }

  clearData() {
    this.social = JSON.parse(localStorage.getItem('socialusers'));
    console.log(this.social);
    if (this.social !== null) {
      console.log(this.social.id)
      this.socialLoginService.clearSavedResponse(this.social.id).subscribe();
      this.productDataService.isLoggedIn.next(false);
      this.isLoading = false;
    }

    localStorage.removeItem('socialusers');
    this.router.navigate(['/login'])
  }

}
