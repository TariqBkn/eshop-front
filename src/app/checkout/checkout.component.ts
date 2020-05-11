import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrdersService } from '../Services/orders/orders.service';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { Router } from '@angular/router';
import { Order } from '../Models/Order';
import { NumberOfOrderLinesInCartService } from '../Services/DataShare/number-of-order-lines-in-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @Input() orderId: number
  order: Order= new Order()
  isLinear = true;
  payementMethodFormGroup: FormGroup;
  orderCheckedOut=false
  constructor(private formBuilder: FormBuilder, private ordersService: OrdersService, private notificationService: NotificationService, private router: Router, private numberOfOrderLinesInCartService: NumberOfOrderLinesInCartService) {}

  ngOnInit() {
    this.payementMethodFormGroup = this.formBuilder.group({
      payementMethod: ['', Validators.required]
    });
    //this.order = this.ordersService.getOrder(this.orderId) 
    this.getProduct()
  }
  getProduct(){
     this.ordersService.getOrder(this.orderId).subscribe(
      response=>{
         this.order=response
      },
      error=>{
        console.error(JSON.stringify(error))
        if(error.status==404) this.notificationService.warn("Produit introuvable!") 
        this.notificationService.warn("Une erreur s'est produite lors du chargement du produit")
      }
    )
  }
  onCheckout(){
    this.ordersService.checkout(this.orderId).subscribe(
      response=>{
        this.orderCheckedOut=true
        this.notificationService.warn("Votre demande à été traité.")
        this.router.navigate([''])
        this.numberOfOrderLinesInCartService.pushValue(0)
      },
      error=>{
        this.notificationService.warn("Votre demande n'a pas pu être traitée.");
      }
    )
  }
}
