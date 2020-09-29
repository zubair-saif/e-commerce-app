import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartProductId: string;
  cartList: Cart[] = [];
  quantity: number = 0;
  unsub: Subscription;
  sum: number = 0;
  cartLocalList: any[];
  searchTerm: string;

  constructor(private productDataService: ProductDataService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  async ngOnInit(): Promise<void> {

    this.productDataService.searchInputChanged.subscribe((input) => {
      console.log(input);
      this.searchTerm = input;
    })

    this.cartList = await this.productDataService.getCart();

    this.updateQuantityAndTotal(this.cartList);

    this.productDataService.totalItems.next(this.quantity);
  }

  increase(index) {

    const cart: Cart = this.cartList[index];
    cart.cartProductQuantity++;

    this.quantity = this.quantity + 1;
    this.productDataService.totalItems.next(this.quantity);
    this.sum = 0;
    for (let j = 0; j < this.cartList.length; j++) {

      this.sum += this.cartList[j].cartProductQuantity * this.cartList[j].cartProductPrice;

    }

    // this.productDataService.totalItems.subscribe((value) => {
    //   console.log(value);
    // });

  }

  decrease(index) {

    const cart: Cart = this.cartList[index];
    cart.cartProductQuantity--;
    // this.productDataService.getCart();

    this.quantity = this.quantity - 1;
    this.productDataService.totalItems.next(this.quantity);
    this.sum = 0;
    for (let j = 0; j < this.cartList.length; j++) {

      this.sum += this.cartList[j].cartProductQuantity * this.cartList[j].cartProductPrice;

    }

  }

  ngOnDestroy(): void {

  }
  async deleteProduct(id: number) {

    console.log("id  :: " + id);

    await this.productDataService.deleteCartitem(id);


    this.cartList = this.cartList.filter((x => x.id !== id));

    console.log(this.cartList);
    this.updateQuantityAndTotal(this.cartList);

    this.productDataService.totalItems.next(this.quantity);
  }

  updateQuantityAndTotal(cartList: Cart[]) {
    this.quantity = 0;
    for (let j = 0; j < this.cartList.length; j++) {

      this.quantity += this.cartList[j].cartProductQuantity;

    }

    this.sum = 0;
    for (let j = 0; j < this.cartList.length; j++) {

      this.sum += this.cartList[j].cartProductQuantity * this.cartList[j].cartProductPrice;

    }
  }

  checkout() {
    if (this.cartList !== null && this.cartList.length > 0) {
      this.router.navigate(['/checkout']);
    }
    else {
      alert("no item in cart");
      return;
    }


  }
}
