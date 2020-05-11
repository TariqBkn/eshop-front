import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  getOrder(orderId: number) {
    return this.httpClient.get<any>(environment.main_api_url+"/orders/"+orderId);
  }
  checkout(orderId: number) {
    return this.httpClient.patch<any>(environment.main_api_url+"/orders/"+orderId+"/checkout",null);
  }

  constructor(private httpClient:HttpClient) { }
}
