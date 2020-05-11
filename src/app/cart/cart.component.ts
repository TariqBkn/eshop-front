import { Component, OnInit, Input } from '@angular/core';
import { OrderLinesService } from '../Services/orderLines/order-lines.service';
import { OrderLine } from '../Models/OrderLine';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { error } from 'protractor';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private orderLinesService : OrderLinesService, private notificationService:NotificationService, private router : Router, private myLocation: Location) { }
  orderLines : OrderLine[] = new Array()
  @Input() textOnly=false
  ngOnInit(): void {
    this.loadOrderLinesOfConnectedUser();
  }

  responseJSON
  confirmCommand:boolean=false
  orderId: number =null

  private loadOrderLinesOfConnectedUser() {
    this.orderLinesService.getOrderLines().subscribe(response => {
       this.orderLines = response; 
       this.responseJSON = JSON.stringify(response)
       this.goBackIfCartIsEmpty();
       if(this.orderLines[0]) this.orderId=this.orderLines[0].order.id
    }, error => {
      console.log(JSON.stringify(error));
      this.notificationService.warn("Une erreur s'est produite lors du chargement de vos lignes de commandes.");
    });
  }

  private goBackIfCartIsEmpty() {
    if (this.orderLines.length == 0) {
      this.myLocation.back();
      this.notificationService.warn("Panier vide!");
    }
  }

  deleteOrderLine(orderLineId: number){
    this.orderLinesService.delete(orderLineId).subscribe(
      response =>{
        this.orderLines=this.orderLines.filter(orderLine => orderLine.id!=orderLineId)
        this.notificationService.warn("Supprimé")
      },
      error=>{
        console.warn(JSON.stringify(error))
        this.notificationService.warn("Erreur lors de la suppression de la commande!")
      }
    )
  }
  
  confirmerCommande(){
    if(this.orderLines.length>0) this.confirmCommand=true
  }

  annulerCommande(){
    this.confirmCommand=false
  }

}
