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
    return this.httpClient.post<UserData>(this.backendBaseUrl+'/users/login',{username,password}).pipe(
      map(
        userData => {
        if(!userData.accountNonLocked){
          this.logOut();
          //TODO: tell user their account is locked
          return userData;
        }
        sessionStorage.setItem('token',userData.token)
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('role',userData.role);
        sessionStorage.setItem('UserData',JSON.stringify(userData))
        this.updateUserData(userData);
        return userData;
        }
      )
    );
}
isUserLoggedOut(){
  return !this.isUserLoggedIn()
}
isUserLoggedIn() {    
    let user = sessionStorage.getItem('username');
    let token = sessionStorage.getItem('token');

    if(token && user){
       var decodedToken:any = this.jwtHelperService.decodeToken(token); 
       if(this.jwtHelperService.isTokenExpired(token)){
        return false;
      }else{
        return true;
      }
    }
    console.log(token+user)
    return false;
}

  isCurrentUserAdmin(){
    if(sessionStorage.getItem('role')==null){
       console.log('role null'); return false;
    }
    return sessionStorage.getItem('role')=="ADMIN";
  }

  logOut() {
     sessionStorage.clear();
     this.router.navigate(['login'])
     this.notificationService.neutral("Déconnexion")
  }

  getToken(): string{
    if(this.isUserLoggedIn()){
       return sessionStorage.getItem('token')
    }
    this.notificationService.warn("Vous êtes déconnecté")
    this.logOut()
    return null;
   }
}
