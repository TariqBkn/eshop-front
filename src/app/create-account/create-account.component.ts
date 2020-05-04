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
    private formbuilder : FormBuilder) {  }
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
    this.usersService.onSubmit(utilisateur).subscribe(
        response => {
            this.showSpinner=false;
            this.status=JSON.stringify(response.status);
            this.msg=JSON.stringify(response.message);
            this.items=response.items;
            this.openSnackBar('X');
            if(response.message=="account_created"){
            this.authenticationService.authenticate(this.registrationForm.get('email').value, this.registrationForm.get('password').value).subscribe(
              data => {
               /* this._snackBar.open('Connecté', 'X', {
                  duration: 6000,
                }); */
                this.router.navigate(['profilePic']);
               },
              error => {
                // this._snackBar.open('Email ou mot-de-passe invalide', 'X', {
                //   duration: 6000,
                // });
              }
            )
            }
            this.router.navigate(['signup']);
        },
        err=>{
          this.showSpinner=false;
          console.log(JSON.stringify(err))
        })
    }

  openSnackBar( action: string) {
    let message;
    if(this.msg==='"account_created"') {
      message="Votre Compte a été Crée";
    }
    else if (this.msg==='"invalid_email"') {message = message="Cet Email est déjà Utilisé"}
    else{
    //   this._snackBar.open(this.msg, action, {
    //     duration: 4000,
    //   });}
    // this._snackBar.open(message, action, {
    //   duration: 4000,
    // });
  }
}

    onClickSubmit(){
      const newUser = {
        
        firstName : this.registrationForm.get('firstname').value,
        lastName : this.registrationForm.get('lastname').value,
        city : this.registrationForm.get('city').value,
        streetName : this.registrationForm.get('streetname').value,
        number : this.registrationForm.get('number').value,
        email : this.registrationForm.get('email').value,
        password : this.registrationForm.get('password').value,
        regisrationDate : Date.now(),
        accountNonLocked :true,
        roles:['USER'],
      }
      this.register(newUser);
    }
    
    isFieldValid(field:string):boolean{
      return this.registrationForm.get(field).touched && this.registrationForm.get(field).invalid;
    }

}