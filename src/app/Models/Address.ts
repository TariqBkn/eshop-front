export class Address{
    private id :number;
    private city:string;
    private streetName:string;
    private number:number;

    constructor(id, city, streetName, number){
        this.id=id;
        this.city=city;
        this.streetName=streetName;
        this.number=number;
    }

    getId():number{
        return this.id;  
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