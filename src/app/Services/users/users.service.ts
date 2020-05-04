import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../Authentication/authentication-service.service'
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token:string

  constructor(private http : HttpClient,private authenticationService:AuthenticationService) { 
    this.authenticationService.currentUserData.subscribe(data=>{
      if(data) {
        this.token=data.token;
        this.httpOptions.headers=new HttpHeaders({
          Authorization : 'Bearer '+data.token,
          'Content-Type':'application/json'
         })
      }
    });
  }
   httpOptions = {
    headers: new HttpHeaders()
  }



  onSubmit(user: any) {
    return this.http.get<any>(environment.main_api_url+"/users/", this.httpOptions);
  }

}
