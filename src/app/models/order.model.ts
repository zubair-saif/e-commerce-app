import { Cart } from './cart.model';

export class Order {

    constructor(
        public cartList: Cart[],
        public country: string,
        public firstName: string,
        public lastName: string,
        public companyName: string,
        public address: string,
        public residence: string,
        public province: string,
        public zipCode: string,
        public email: string,
        public phone: string,
        public notes: string,
        public totalPrice: number) {

    }
}