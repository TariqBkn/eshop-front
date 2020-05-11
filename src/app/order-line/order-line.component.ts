import { Component, OnInit, Input, Output } from '@angular/core';
import { OrderLine } from '../Models/OrderLine';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.css']
})
export class OrderLineComponent implements OnInit {

  @Input() orderLine: OrderLine
  @Input() textOnly:boolean = false
  @Output('deleteOrderLine') deleteOrderLineEmitter : EventEmitter<number> = new EventEmitter();
  confirmDelete : boolean = false
  constructor(private notificationsService: NotificationService) { }

  ngOnInit(): void {
  }

  deleteOrderLine(){
    if(this.confirmDelete){
      this.deleteOrderLineEmitter.emit(this.orderLine.id)
      location.reload()
    }
    this.confirmDelete=true
  }

  cancelDelete(){
    this.confirmDelete=false
  }
}
