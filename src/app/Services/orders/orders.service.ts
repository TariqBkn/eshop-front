import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/Models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  constructor(private httpClient:HttpClient) { }

  getOrder(orderId: number) {
    return this.httpClient.get<any>(environment.main_api_url+"/orders/"+orderId);
  }

  checkout(orderId: number) {
    return this.httpClient.patch<any>(environment.main_api_url+"/orders/"+orderId+"/checkout",null);
  }

  myCheckouts() {
    return this.httpClient.get<Order[]>(environment.main_api_url+"/orders/checkouts");
  }

  getTurover() {
    return this.httpClient.get<any>(environment.main_api_url+"/orders/turnover");
  }
}  
