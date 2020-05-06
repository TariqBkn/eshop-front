import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http'
import { AuthenticationService } from '../Authentication/authentication-service.service';

@Injectable({
  providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request : HttpRequest<any>, next: HttpHandler) {
    alert(request.url)
     if( !request.url.match("/users/signup") && !request.url.match("users/login") ){
      alert('authorized req') 
      let authorizedReq = request.clone({
        setHeaders:{
          Authorization: 'Bearer '+this.authenticationService.getToken()
        }
      })
      return next.handle(authorizedReq);
    }
    alert("public req")
    return next.handle(request);
  }
}
