export class Cart {

    public id: number;
    public cartProductId: number;
    public cartProductName: string;
    public cartProductImagePath: string;
    public cartProductSize: string;
    public cartProductQuantity: number;
    public cartProductPrice: number;

    constructor(cartProductId: number, cartProductName: string, cartProductImagePath: string, cartProductSize: string, cartProductQuantity: number, cartProductPrice: number) {
        this.cartProductId = cartProductId;
        this.cartProductName = cartProductName;
        this.cartProductImagePath = cartProductImagePath;
        this.cartProductSize = cartProductSize;
        this.cartProductQuantity = cartProductQuantity;
        this.cartProductPrice = cartProductPrice;

    }
}