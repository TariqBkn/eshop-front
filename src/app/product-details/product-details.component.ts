import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product'
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input('immobilier') product : Product;
  
  constructor(private spinner: NgxSpinnerService){
    this.spinner.show();
   }

  ngOnInit() {
    
    this.spinner.hide();
  }

}
