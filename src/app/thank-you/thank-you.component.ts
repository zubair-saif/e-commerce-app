import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {


  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {

    // console.log(this.productDataService.getOrder());

  }

}
