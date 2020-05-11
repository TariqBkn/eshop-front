import { Component, OnInit , OnChanges } from '@angular/core';
import { fade, slide } from '../animations';
import { FormBuilder  } from '@angular/forms';
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';
import { NumberOfOrderLinesInCartService } from '../Services/DataShare/number-of-order-lines-in-cart.service';
import { OrderLinesService } from '../Services/orderLines/order-lines.service';
import { NotificationService } from '../Services/Notifications/notifications.service';

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
  constructor(authenticationService: AuthenticationService, private numberOfOrderLinesInCartService : NumberOfOrderLinesInCartService, private orderLinesService: OrderLinesService, private notificationService: NotificationService ) {
    this.authenticationService=authenticationService;
   }
    numberOfProductsInCart:number=0
    
    ngOnInit(): void {
      this.subscribeToNumberOfOrderLinesInCartService();
    }
    private loadOrderLinesOfConnectedUser() {
      this.orderLinesService.getOrderLines().subscribe(response => {
         if(response) this.numberOfOrderLinesInCartService.pushValue(response.length) 
      }, error => {
        this.notificationService.warn("Erreur de connexion au serveur (header).");
      });
    }
    OnChanges(){
      this.loadOrderLinesOfConnectedUser()
    }
  private subscribeToNumberOfOrderLinesInCartService() {
    this.numberOfOrderLinesInCartService.currentValue.subscribe(value => { this.numberOfProductsInCart = value; });
  }

    isUserLoggedIn(): boolean{
      return this.authenticationService.isUserLoggedIn()
    }

    noProductsInCart(){
      return this.numberOfProductsInCart==0
    }
}
