import { Component, OnInit } from '@angular/core';
import { fade, slide } from '../animations';
import { FormBuilder  } from '@angular/forms';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class TopBarComponent implements OnInit {
  authenticationService
  constructor(authenticationService: AuthenticationService) {
    this.authenticationService=authenticationService;
   }

  ngOnInit(): void {
  }
    isUserLoggedIn(): boolean{
      return this.authenticationService.isUserLoggedIn()
    }
}
