import { Image } from './Image';

export class Product {
    id:number;
    title:string;
    description:string;
    unitPrice:number;
    colors:[];
    images: Image[];
    providerName:string;
    note:number;
    promotionRatio:number;
    quantityInStock:number;
}