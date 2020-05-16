import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products/products.service';
import { UsersService } from '../Services/users/users.service';
import { OrdersService } from '../Services/orders/orders.service';
import { NotificationService } from '../Services/Notifications/notifications.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private productsService: ProductsService, private usersService: UsersService, private ordersService: OrdersService, private notificationService: NotificationService) { }

  usersNumber;
  productsNumber;
  bannedUsersNumber;
  turnover;
  blockedUsersNumber;
  ngOnInit(): void {
    this.getNumberOfUsers();
    this.getNumberOfBlockedUsers()
    this.getNumberOfProducts()
    this.getTurover();
  }

  getTurover() {
    this.ordersService.getTurover().subscribe(
      resp => {
        this.turnover=resp
      },
      err => {
        this.notificationService.warn("Impossible de charger le chiffre d'affaire.")
      }
    )
  }
  getNumberOfProducts() {
    this.productsService.getNumberOfProducts().subscribe(
      resp => {
        this.productsNumber=resp
      },
      err => {
        this.notificationService.warn("Impossible de charger le nombre total de produits.")
      }
    )
  }
  getNumberOfBlockedUsers() {
    this.usersService.getNumberOfBlockedUsers().subscribe(
      resp => {
        this.blockedUsersNumber=resp
      },
      err => {
        this.notificationService.warn("Impossible de charger le nombre d'utilisateurs bloqués.")
      }
    )
  }
  getNumberOfUsers() {
    this.usersService.getNumberOfUsers().subscribe(
      resp => {
        this.usersNumber=resp
      },
      err => {
        this.notificationService.warn("Impossible de charger le nombre total d'utilisateurs.")
      }
    )
  }

}
