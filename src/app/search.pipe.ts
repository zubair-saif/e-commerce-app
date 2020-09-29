import { Cart } from './models/cart.model';
import { Product } from './models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter' })
export class SearchPipe implements PipeTransform {
    transform(list: Product[], filterText: string): any {
        return list ? list.filter(item => item.productName.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}

@Pipe({ name: 'cartListFilter' })
export class CartSearchPipe implements PipeTransform {
    transform(list: Cart[], filterText: string): any {
        return list ? list.filter(item => item.cartProductName.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}