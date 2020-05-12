import { Address} from './Address'
export class UserDTO {
    firstName : string;

    lastName : string;
    
    address: Address;

    email:string;

    accountNonLocked:boolean;

    role:string;

    password:string;    
}