import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../../Models/UserData'
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment'
import { NotificationService } from '../Notifications/notifications.service'

export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
   private userData = new BehaviorSubject<UserData>(null);
   currentUserData = this.userData.asObservable();
   private backendBaseUrl = environment.main_api_url;
  
  constructor(
     private httpClient:HttpClient,
     private router:Router,
     private notificationService : NotificationService,
     private jwtHelperService : JwtHelperService
   ) { this.updateUserData(null);}
  
  updateUserData(data:UserData){
    if(data!=null){
      this.userData.next(data)
    }else{
      this.userData.next( JSON.parse(sessionStorage.getItem('UserData')) )
    }
  }

  authenticate(username, password) {
  

  return this.httpClient.post<UserData>(this.backendBaseUrl+'/login',{username,password}).pipe(
    map(
      userData => {

      if(!userData.accountNonLocked){
        this.logOut();
        return userData;
      }
      
      sessionStorage.setItem('username',username);
      let role :string="";
      sessionStorage.setItem('roles',role);
      sessionStorage.setItem('UserData',JSON.stringify(userData))
      this.updateUserData(userData);
      return userData;
      }
    )
  );
}
 
isUserLoggedIn() {    
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');

    if(token){
      var decodedToken:any = this.jwtHelperService.decodeToken(token);
      // console.log('A1')
      if( decodedToken.exp === undefined){
          if(this.router.url !== '/login'){
          this.router.navigate(['login']);
        }
        console.log('jwt expired')
        /// console.log('A2')
        return false;
      }
        if(this.jwtHelperService.isTokenExpired(decodedToken)){
        return false;
      }else{
            return true;
      }
    }
    return !(user===null);
}

  isCurrentUserAdmin(){
    if(sessionStorage.getItem('roles')==null){ console.log('roles null'); return false;}
    return sessionStorage.getItem('roles').includes('ADMIN');

  }

  logOut() {
   // this.requestData.notify(0);
     sessionStorage.clear();
  }

}
