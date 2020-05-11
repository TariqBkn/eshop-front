import { Product } from './Product';
import { Order } from './Order';

export class OrderLine{   
    id: number;
    product :Product;
    order: Order;
    quantity: number;
    cost: number;

    constructor(product:Product, quantity:number){
        this.product=product
        this.quantity=quantity
        this.cost=quantity*(product.unitPrice*(1-product.promotionRatio))
    }
}