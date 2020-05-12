import { OrderLine } from './OrderLine';
import { User } from '../Services/Authentication/authentication-service.service';

export class Order{
    id : number;
    orderLines : OrderLine[] = new Array();
    user :User;
    checkedOut:boolean;
    totalCost: number
}