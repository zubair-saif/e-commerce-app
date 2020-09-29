import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../models/product';
import { takeUntil } from 'rxjs/operators';
import { timer } from 'rxjs';
import { async } from '@angular/core/testing';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.css']
})
export class ShopSingleComponent implements OnInit {

  productId: number = 0;
  products: Product[] = null;
  selectedItemSize: string;
  sizesItem: string[] = ['Small', 'Medium', 'Large', 'Extra Large'];
  quantity: number = 0;
  previousQuantity: number = 0;
  filtersLoaded: Promise<boolean>;
  dataRecieved: boolean = false;
  productName: string = "";


  constructor(private activatedRoute: ActivatedRoute, private productDataService: ProductDataService,
    private router: Router) {

  }
  async ngOnInit(): Promise<void> {
    console.log("called");

    this.activatedRoute.params.subscribe((params: Params) => {
      this.productId = params.id;

    });



    console.log("prodId  :: " + this.productId);

    this.products = await this.productDataService.getProduct(this.productId);


    this.productName = this.products[0].productName;

    if (this.products !== null) {

      this.dataRecieved = true;
      console.log(this.products);
      this.filtersLoaded = Promise.resolve(true);

    }



    // new Product(value.productId,value.productName,value.productImagePath,value.productDescription,
    //   value.productHeading,value.productPrice,value.productCategory);
    this.productDataService.totalItems.subscribe((value) => {
      this.previousQuantity = value;
    });



    this.productDataService.emitSearchInputChangesEvent('');
  }
  // ngOnInit(): void {

  //   console.log("ngonInIt");
  //   // this.productDataService.totalItems.subscribe((value) => {
  //   //   this.previousQuantity = value;
  //   // });

  //   // this.activatedRoute.params.subscribe((params: Params) => {
  //   //   this.productId = params.id;
  //   //   if (params && this.productId) {
  //   //     console.log(this.productId);

  //   //     //  this.product = this.productDataService.getProduct(this.productId);

  //   //     console.log(this.product);

  //   //   }

  //   // });

  //  // this.productDataService.emitSearchInputChangesEvent('');


  // }

  onSelectionChange(item) {
    console.log(item)
    this.selectedItemSize = item;
  }

  addToCart() {
    console.log("size :: " + this.selectedItemSize)

    if (this.quantity === 0 || this.selectedItemSize === undefined || this.quantity < 0) {
      alert('Please select Quantity and Size');
      return;
    }



    // this.productDataService.totalItems.next(this.quantity);

    const cart = new Cart(this.productId, this.products[0].productName,
      this.products[0].productImagePath, this.selectedItemSize, this.quantity, this.products[0].productPrice);




    this.productDataService.addToCart(cart).subscribe((response) => {
      console.log(response);
    });

    this.router.navigate(['/cart']);
  }

  increment() {

    this.quantity = this.quantity + 1;
    this.productDataService.totalItems.next(this.quantity);
  }

  decrement() {
    this.quantity = this.quantity - 1;
    this.productDataService.totalItems.next(this.quantity);
  }

}
