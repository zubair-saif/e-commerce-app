import { async } from '@angular/core/testing';
import { Cart } from './../models/cart.model';
import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartList: Cart[] = [];
  sum: number = 0;
  orderForm: FormGroup;

  constructor(private productDataService: ProductDataService, private router: Router, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {

    this.initForm();
    this.cartList = await this.productDataService.getCart();

    console.log(this.cartList);

    for (let j = 0; j < this.cartList.length; j++) {

      this.sum += this.cartList[j].cartProductQuantity * this.cartList[j].cartProductPrice;

    }

  }

  initForm() {

    this.orderForm = this.fb.group({
      country: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      companyName: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      residence: new FormControl(null, Validators.required),
      province: new FormControl(null, Validators.required),
      zipCode: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      notes: new FormControl(null, Validators.required)

    });

  }

   submit() {

    const order = new Order(this.cartList, this.orderForm.value.country, this.orderForm.value.firstName,
      this.orderForm.value.lastName, this.orderForm.value.companyName, this.orderForm.value.address, this.orderForm.value.residence,
      this.orderForm.value.province, this.orderForm.value.zipCode, this.orderForm.value.email, this.orderForm.value.phone, this.orderForm.value.notes, this.sum)

    this.productDataService.placeOrder(order).subscribe( async (response) => {
      console.log(response);
      if (response !== null) {

        await this.productDataService.clearCart(this.cartList);

        this.productDataService.totalItems.next(0);
        this.router.navigate(['/thankyou']);
      }
    });






  }

}
