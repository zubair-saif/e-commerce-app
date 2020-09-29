import { Product } from './../models/product';
import { ProductDataService } from './../services/product-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  page: number = 1;
  totalRecords: number;
  itemsPerPage: number = 6;
  config;
  searchTerm: string = '';
  startIndex: number = 0;
  endIndex: number = 6;
  categoryItems: string[] = ['Men', 'Women', 'Children'];
  data: string;

  constructor(private productDataService: ProductDataService) {
    this.totalRecords = this.products.length;

  }

  ngOnInit(): void {

    //   var arr = [1, 2, 2, 3, 4, 5, 5, 5, 6, 7, 7, 8, 9, 10, 10];

    //   var unique = arr.filter(function(elem, index, self) {
    //     return index === self.indexOf(elem);
    // });

    // console.log(unique);

    // let array = [1,2,'3',4,'5',6,'7'];
    // let stringArray = [];
    // let intArray = [];
    // for(let i = 0 ; i < array.length ; i++){
    //   if(typeof array[i] === 'string'){
    //       stringArray.push(array[i]);
    //   }
    //   else{
    //     intArray.push(array[i]);
    //   }
    // }

    // console.log(intArray);
    // console.log(stringArray);

    this.productDataService.getProducts().subscribe((res: Product[]) => {
      this.products = res;
    });


    this.productDataService.searchInputChanged.subscribe((input) => {
      console.log(input);
      this.searchTerm = input;
    });

  }

  onCategoryClick(item) {
    //   this.products = this.productDataService.getProductWithCategory(item);

    this.productDataService.getProducts().subscribe((products: Product[]) => {
      this.products = products.filter(product => {
        return product.productCategory === item
      });
    });

  }

  // absoluteIndex(indexOnPage: number): number {
  //   return this.itemsPerPage * (this.page - 1) + indexOnPage;
  // }

  // pageChanged(event) {
  //   this.config.currentPage = event;
  // }

  // getArrayFromNumber(length: number) {
  //   return new Array(length / this.products.length)
  // }

  // updateIndex(pageIndex) {
  //   this.startIndex = pageIndex * 6;
  //   this.endIndex = this.startIndex + 6;
  // }

  clicked(value) {
    console.log(value.value);
  }

  dataChanged(amount) {

    console.log(amount);
    let value: string = amount;
    let valueArr: string[] = value.split("-");

    let minValue: string = valueArr[0].replace("$", "");
    let maxValue: string = valueArr[1].replace("$", "");

    this.productDataService.getProducts().subscribe((products: Product[]) => {
      this.products = products.filter(product => {
        return product.productPrice >= parseInt(minValue)
          && product.productPrice <= parseInt(maxValue)

      });
    });


  }

}