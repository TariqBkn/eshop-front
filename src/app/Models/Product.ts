import { Image } from './Image';


const MAX_NUMBER_OF_IMAGES=3

export class Product {
   
    id:number;
    title:string;
    description:string;
    unitPrice:number;
    color:string;
    images: Image[] = new Array();
    providerName:string;
    promotionRatio:number;
    quantityInStock:number;

    public hasAtLeastMaxNumberOfImages(){
        return this.images.length>MAX_NUMBER_OF_IMAGES
    }
    public getNameOfFirstImage(){
        if(this.images) return this.images[0].name;
    }
}