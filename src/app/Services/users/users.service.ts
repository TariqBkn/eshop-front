import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService, User } from '../Authentication/authentication-service.service'
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



  signup(user: User) {
    return this.http.post<any>(environment.main_api_url+"/users/signup", user);
  }

}
