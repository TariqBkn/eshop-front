import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../Authentication/authentication-service.service'
import { environment } from '../../../environments/environment'
import { User } from '../../Models/User'
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

  getConnectedUser() {
    return this.http.get<any>(environment.main_api_url+"/users/me");
  }
  
  update(user: User) {
    return this.http.patch<any>(environment.main_api_url+"/users/me", user)
  }

  getUsers(page: number) {
    return this.http.get<any>(environment.main_api_url+"/users/"+page)
  }

  getUsersByKeyWord(key: string, page: number) {
    return this.http.get<any>(environment.main_api_url+"/users/search/"+key+"/pages/"+page)
  }
  
  alterAccountUnlocked(userId: any) {
    return this.http.patch<any>(environment.main_api_url+"/users/status/alter", userId)
  }
}
