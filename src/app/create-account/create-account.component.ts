import { Component, OnInit } from '@angular/core';
import { UsersService } from '../Services/users/users.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';
import { User } from '../Models/User';
import { PasswordValidator } from '../Shared/Validators'
import { LoginComponent } from '../login/login.component';
import { Router} from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';
import { JsonPipe } from '@angular/common';
import { Address } from '../Models/Address';
import { NotificationService} from '../Services/Notifications/notifications.service'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})



export class CreateAccountComponent implements OnInit {

   showSpinner: boolean=false;
  

  ngOnInit() {
    
  }
  
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private usersService : UsersService, 
    private formbuilder : FormBuilder,
    private notificationService: NotificationService) {  }
    public status;
    public msg;
    public items;
    public emailCreated:boolean=null;

 registrationForm = this.formbuilder.group({
      firstname:[,[Validators.required]],
      lastname:[,[Validators.required]],
      city:[,[Validators.required]],
      streetname:[,[Validators.required]],
      number:[,[Validators.required]],
      email:[,[Validators.required, Validators.email]],
      password:[,[Validators.required]],
      confirmPassword:[,[Validators.required]],
   },
      {validator: PasswordValidator}
   );

  register(utilisateur){
    this.showSpinner=true;
    this.usersService.signup(utilisateur).subscribe(
        response => {
            this.showSpinner=false;
            this.status=JSON.stringify(response.status);
            this.msg=JSON.stringify(response.message);
            this.items=response.items;
            if(response.status==201){
            this.authenticationService.authenticate(this.registrationForm.get('email').value, this.registrationForm.get('password').value).subscribe(
              data => {
                this.notificationService.success("Connecté")
                this.router.navigate(['']);
               },
              error => {
                this.notificationService.success("Impossible de se connecter")
              }
            )
            }
            if(response.status==409){
              this.notificationService.success("Cet email est utilisé par un autre compte")
            }
            this.router.navigate(['signUp']);
        },
        err=>{
          this.showSpinner=false;
          console.log(JSON.stringify(err))
        })
    }
 

    onClickSubmit(){  
     
     const newUser:User = {
        address: new Address(this.registrationForm.get('city').value, this.registrationForm.get('streetname').value, this.registrationForm.get('number').value),
        firstName : this.registrationForm.get('firstname').value,
        lastName : this.registrationForm.get('lastname').value,
        email : this.registrationForm.get('email').value,
        password : this.registrationForm.get('password').value,
        accountNonLocked :true,
        role:'USER'
      }
      this.register(newUser);
    }
    
    isFieldValid(field:string):boolean{
      return this.registrationForm.get(field).touched && this.registrationForm.get(field).invalid;
    }

}