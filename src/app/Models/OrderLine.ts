import { Product } from './Product';

export class OrderLine{
    product:Product;
    quantity:number;

    constructor(product:Product, quantity:number){
        this.product=product
        this.quantity=quantity
    }
}