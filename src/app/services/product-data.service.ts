import { Cart } from './../models/cart.model';

import { PRODUCTS, CART, ORDER } from './mock-data';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { Order } from '../models/order.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap, delay, shareReplay, takeUntil } from 'rxjs/operators';
// import  'rxjs/add/operator/toPromise';



@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  totalItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public searchInputChanged: Subject<string> = new Subject<string>();
  product: Product = null;

  BASE_URL: string = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  getProducts() {

    return this.httpClient.get(this.BASE_URL + 'products');
    //return PRODUCTS;
  }

  async getProduct(productId: number) {
    console.log("id :: " + productId);
    return this.httpClient.get<Product[]>(this.BASE_URL + 'products?productId=' + productId).toPromise();
    // try{
    //   let response = await this.httpClient.get(this.BASE_URL + 'products?productId=' + productId).toPromise();

    //   return response as Product;
    // }catch(e){
    // console.error(e);

    // }


  }

  getProductWithCategory(proCat: string) {
    console.log("category :: " + proCat);

    return PRODUCTS.filter(i => i.productCategory === proCat);
  }

  addToCart(cart: Cart) {

    return this.httpClient.post(this.BASE_URL + "Cart", cart);
    // let item = [];

    // if (localStorage.getItem('cart')) {
    //   item = JSON.parse(localStorage.getItem('cart'));
    // }
    // console.log(item)

    // item.push(cart);
    // localStorage.setItem('cart', JSON.stringify(item));
    //CART.push(item);

    //CART.push(cart);
  }

  async getCart() {
    return this.httpClient.get<Cart[]>(this.BASE_URL + "Cart").toPromise();
  }

  async deleteCartitem(id: number) {
    return this.httpClient.delete<Cart[]>(this.BASE_URL + "Cart/" + id).toPromise();
  }



  placeOrder(order: Order) {
    return this.httpClient.post(this.BASE_URL + "Order", order);
  }

  async clearCart(cartList: Cart[]) {


    for (let j = 0; j < cartList.length; j++) {

      this.httpClient.delete(this.BASE_URL + "Cart/" + cartList[j].id).toPromise();

    }

  }

  emitSearchInputChangesEvent(input) {
    this.searchInputChanged.next(input);
  }

  
}
