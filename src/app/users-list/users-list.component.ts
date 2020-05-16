import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UsersService } from '../Services/users/users.service';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users : Array<User> = [];
  page:number=0;
  pages : Array<number>;
  userId:string;
  value;
  isWaiting;
  constructor(private usersService : UsersService,
              private notificationService : NotificationService,
              private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.getUserData();
    this.getUsers();
  }

  getUserData() {
    this.authenticationService.currentUserData.subscribe(data=>{
      if(data) {
        this.userId=data.id;
      }
    });
  }
  resetValue(){
    this.value='';
    this.getUsers();
  }
  onSearchChange(key:string){
    if(key.length==0){
        this.getUsers();
    }
    this.isWaiting=true;
    if(key.length>0) this.getSearchResults(key);
    this.isWaiting=false;
  }
  getSearchResults(key:string) {
    this.usersService.getUsersByKeyWord(key,this.page).subscribe(
      result=>{
        this.users=result['content'];
        this.pages=new Array(result['totalPages']);
      },
      err=>{
        alert(JSON.stringify(err));
      }
    );
  }
  getUsers() {
    this.usersService.getUsers(this.page).subscribe(
      users=>{
          this.users=users['content'];
          this.pages=new Array(users['totalPages']);          
      },
      err=>{
          this.notificationService.warn("Erreur inconnue.")
      });
  }
    
pageChanged(i:number,event:any){
    event.preventDefault();
    this.page=i;
    this.getUsers();
}
switchLocked(userId){
 this.usersService.alterAccountUnlocked(userId).subscribe(
    resp=>{
      this.notificationService.success("Effectué")
      var u = this.users.find(x=>x.id == userId);
      u.accountNonLocked=!u.accountNonLocked;
    },
    err =>{
      console.log(JSON.stringify(err))
      this.notificationService.warn("Erreur inconnue");
    }
  );
}

isUsersNotEmpty(){
  if(this.users){
    return this.users.length>0;
  }else{
    return false;
  } 
}
}
