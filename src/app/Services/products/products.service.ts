import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../Authentication/authentication-service.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  token: string;
  userId: string;
   
  httpOptions = {
    headers: new HttpHeaders()
  }

  productsBaseUrl: string = environment.main_api_url+"/products";

  constructor(
              private httpClient : HttpClient,
              private authenticationService:AuthenticationService,
              ) { 
                this.authenticationService.currentUserData.subscribe(data=>{
                  if(data) {
                    this.token=data.token;
                    this.httpOptions.headers=new HttpHeaders({
                      Authorization : 'Bearer '+this.token,
                      'Content-Type':'application/json'
                      })
                  }
                });
              }

}
