export class Address{
     private city:string;
    private streetName:string;
    private number:number;

    constructor( city, streetName, number){
         this.city=city;
        this.streetName=streetName;
        this.number=number;
    }
 
    getCity():string{
    return this.city;  
    }
    
    getStreetName():string{
    return this.streetName;  
    }
    
    getNumber():number{
    return this.number;  
    }
}