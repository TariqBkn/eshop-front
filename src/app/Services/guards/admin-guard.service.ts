import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../Authentication/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(
              private Router: Router,
              private authenticationService: AuthenticationService
              ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if(this.authenticationService.isUserLoggedIn() && this.authenticationService.isCurrentUserAdmin()){
      return true;
    }else{
      return false;
    }
  }
}
