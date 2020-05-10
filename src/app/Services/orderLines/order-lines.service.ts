import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { OrderLine } from 'src/app/Models/OrderLine';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class OrderLinesService {

  constructor(private httpClient: HttpClient) { }
  
  addOrderLine(orderLine: OrderLine) {
    alert(environment.main_api_url+"/orderlines")
    return this.httpClient.post<any>(environment.main_api_url+"/orderlines", orderLine);
  }

}
