import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../Services/orders/orders.service';
import { Order } from '../Models/Order';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { OrderLine } from '../Models/OrderLine';

@Component({
  selector: 'app-checkouts-history',
  templateUrl: './checkouts-history.component.html',
  styleUrls: ['./checkouts-history.component.css']
})
export class CheckoutsHistoryComponent implements OnInit {
  orders: Order[] = new Array()
  textOnly=true
  constructor(private ordersService: OrdersService, private notificationsService: NotificationService) { }
  
  ngOnInit(): void {
    this.ordersService.myCheckouts().subscribe(
      response => {
          this.orders = response 
      },
      error => {
        console.log(JSON.stringify(error))
        this.notificationsService.warn("Erreur lors du chargement de votre historique de commandes.")
      }
    )
  }

}
