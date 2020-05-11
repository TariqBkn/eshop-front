import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../Authentication/authentication-service.service'
import { Product } from 'src/app/Models/Product';
import { Observable } from 'rxjs/internal/Observable';
import { SimilarProduct } from 'src/app/Models/SimilarProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  token: string;
  userId: string;
   
  httpOptions = {
    headers: new HttpHeaders()
  }

  productsBaseUrl: string = environment.main_api_url+"/products/";

  constructor(
              private httpClient : HttpClient,
              private authenticationService:AuthenticationService,
               ) { 
                this.authenticationService.currentUserData.subscribe(data=>{
                  if(data) {
                    this.token=data.token;
                    this.httpOptions.headers=new HttpHeaders({
                       'Content-Type':'application/json'
                      })
                  }
                });
              }

  getProductById(id: number):Observable<any>{
      return this.httpClient.get<Product>(this.productsBaseUrl+id, this.httpOptions);
  }
  getProducts() {
    return this.httpClient.get<any>(this.productsBaseUrl, this.httpOptions);
  }
  getSimilarProducts(productId: number) {
    return this.httpClient.get<any>(this.productsBaseUrl+productId+"/similar", this.httpOptions);
  }
}
