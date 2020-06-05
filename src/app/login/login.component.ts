import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';
 import { NotificationService } from '../Services/Notifications/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false
  showLoader: boolean;
  disableLogin: boolean;

  constructor(private router: Router,
    private loginservice: AuthenticationService,
     private notificationService : NotificationService
    ) { }

  ngOnInit() {
  }
  goToSignup(){
    this.router.navigate(['signup'])
  }
  checkLogin() {
    this.showLoader=true;
    this.username = this.username.trim()
    this.password = this.password.trim()
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.showLoader=false;
        if(!data.accountNonLocked){
          this.notificationService.warn('Votre compte est veroullé.');
          return;
        }
          this.notificationService.neutral('Connecté.');

         
          this.router.navigate([''])
         
        this.invalidLogin = false
      },
      error => {
        this.showLoader=false;
        if(error.message=="Http failure response for http://localhost:8080/login: 0 Unknown Error"){
          this.notificationService.warn("Aucune Réponse de la part du serveur.");
        }else if(error.status==401){
          this.notificationService.warn("Email ou mot-de-passe incorrectes.");
        }else{
            this.notificationService.warn("Erreur inconnue.");
        }
          this.invalidLogin = true
      }
    );

  }

}