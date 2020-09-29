export class Product {

    public productId: number;
    public productName: string;
    public productImagePath: string;
    public productDescription: string;
    public productHeading: string;
    public productPrice: number;
    public productCategory: string;

    constructor(productId: number, productName: string, productImagePath: string, productDescription: string, productHeading: string, productPrice: number, productCategory: string) {
        this.productId = productId;
        this.productName = productName;
        this.productImagePath = productImagePath;
        this.productDescription = productDescription;
        this.productHeading = productHeading;
        this.productPrice = productPrice;
        this.productCategory = productCategory;
    }

}