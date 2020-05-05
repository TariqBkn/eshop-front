import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';

@Component({
  selector: 'app-logout-module',
  templateUrl: './logout-module.component.html',
  styleUrls: ['./logout-module.component.css']
})
export class LogoutModuleComponent implements OnInit {

  constructor(
    private authentocationService: AuthenticationService,
    private router: Router
    ) {
      this.authentocationService.logOut();
      this.router.navigate['login']
     }

ngOnInit(): void {
 
}

}
