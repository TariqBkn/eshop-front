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

  checkLogin() {
    this.showLoader=true;
    this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.showLoader=false;
        if(!data.accountNonLocked){
          this.notificationService.warn('Votre compte est veroullé.');
          return;
        }
          this.notificationService.neutral('Connecté.');

        if(this.loginservice.isCurrentUserAdmin()){
          this.router.navigate(['admin/stats'])
        }else{this.router.navigate([''])}
        this.invalidLogin = false
      },
      error => {
        this.showLoader=false;
        if(error.message=="Http failure response for http://localhost:8080/login: 0 Unknown Error"){
          this.notificationService.warn("Aucune Réponse de la part du serveur.");
        }else if(error.message=="Http failure response for http://localhost:8080/login: 401 OK"){
          this.notificationService.warn("Email ou mot-de-passe incorrectes.");
        }else{
           this.notificationService.warn("Erreur inconnue.");
        }
          this.invalidLogin = true
      }
    );

  }

}