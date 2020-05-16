import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../Services/users/users.service'
import { User } from '../Models/User';
import { UserDTO } from '../Models/UserDTO';
import { PasswordValidator } from '../Shared/Validators'
import { Router} from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';
import { Address } from '../Models/Address';
import { NotificationService} from '../Services/Notifications/notifications.service'
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})


export class CreateAccountComponent implements OnInit {

   showSpinner: boolean=false;
  
  @Input() edit: boolean=false
  connectedUser: User = new User();

  ngOnInit() {
    if(this.edit){
      this.usersService.getConnectedUser().subscribe(
        resp => {
          this.connectedUser = resp
           this.patchConnectedUserIntoForm();
        },
        error => {
          console.log(JSON.stringify(error));
          this.notificationService.warn("Erreur lors du chargement de vos informations") 
        }
      )
    }
  }
  
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private usersService : UsersService, 
    private formbuilder : FormBuilder,
    private notificationService: NotificationService) {  } 
    public emailCreated:boolean=null;

 registrationForm = this.formbuilder.group({
      id: [],
      firstName:[,[Validators.required]],
      lastName:[,[Validators.required]],
      city:[,[Validators.required]],
      streetName:[,[Validators.required]],
      number:[,[Validators.required]],
      email:[,[Validators.required, Validators.email]],
      password:[,[Validators.required]],
      confirmPassword:[,[Validators.required]],
   },
      {validator: PasswordValidator}
   );

  private patchConnectedUserIntoForm() {
    this.registrationForm.patchValue((this.connectedUser))
 
    this.registrationForm.get('confirmPassword').patchValue(this.connectedUser.password);
    this.registrationForm.get('city').patchValue(this.connectedUser.address.city);
    this.registrationForm.get('streetName').patchValue(this.connectedUser.address.streetName);
    this.registrationForm.get('number').patchValue(this.connectedUser.address.number); 
    this.registrationForm.get('id').patchValue(this.connectedUser.id); 
  }

  register(user){
    this.showSpinner=true;
    this.usersService.signup(user).subscribe(
        response => {
            this.showSpinner=false; 
            if(response.status==201){
            this.authenticationService.authenticate(this.registrationForm.get('email').value, this.registrationForm.get('password').value).subscribe(
              data => {
                this.notificationService.success("Connecté")
                this.router.navigate(['']);
               },
              error => { 
                  this.notificationService.warn("Compte crée, Impossible de se connecter!")
                  console.log(error) 
              }
            )
            }
        },
        error=>{
           this.showSpinner=false;
            if(error.status==409){
              this.notificationService.success("Cet email est utilisé par un autre compte")
            }else if(error.status==201){
                this.notificationService.success("Connecté")
                this.router.navigate(['']);
            }else{
                this.notificationService.warn("Impossible de se connecter")
            }
        });
    }
    update(user: User) {
      this.showSpinner=true;
      this.usersService.update(user).subscribe(
        response => {
            this.showSpinner=false; 
            this.notificationService.warn('Modifications enregistrées.')
        },
        error=>{
          this.showSpinner=false; 
          this.notificationService.success("Une erreur s'est produite lors de la mise à jours de vos informations") 
        });
    }

    onClickSubmit(){  
     
     const newUser:UserDTO = {
        address: new Address(this.registrationForm.get('city').value, this.registrationForm.get('streetName').value, this.registrationForm.get('number').value),
        firstName : this.registrationForm.get('firstName').value,
        lastName : this.registrationForm.get('lastName').value,
        email : this.registrationForm.get('email').value,
        password : this.registrationForm.get('password').value,
        accountNonLocked :true,
        role:'USER'
      }
      if(this.edit){
        let user : User ={
          id:this.connectedUser.id,
          address: newUser.address,
          firstName : newUser.firstName,
          lastName : newUser.lastName,
          email : newUser.email,
          password : newUser.password,
          accountNonLocked :true,
          role: newUser.role
         } 
        this.update(user);
      } else{
        this.register(newUser);
      }
    }

    delete(){
      if(confirm("êtes vous sûr de vouloir supprimer votre compte?")){
        this.usersService.delete(this.connectedUser.id).subscribe(
          resp => {
            this.notificationService.warn("Compte supprimé")
            this.router.navigate(['login'])
          },
          err => {
            this.notificationService.warn("Impossible de supprimer votre compte.")
          }
        )
      }
    }
    
    isFieldValid(field:string):boolean{
      return this.registrationForm.get(field).touched && this.registrationForm.get(field).invalid;
    }

}