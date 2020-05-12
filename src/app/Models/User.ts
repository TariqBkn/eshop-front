import { Address} from './Address'
export class User {
    id : number
    firstName : string;

    lastName : string;
    
    address: Address;

    email:string;

    accountNonLocked:boolean;

    role:string;

    password:string;    
}