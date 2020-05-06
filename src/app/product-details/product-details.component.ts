import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  products_images_base_url=environment.main_api_url+"products/images/nature_work.jpg";
  @Input('product') product : Product = new Product();
  constructor(private spinner: NgxSpinnerService){
    //this.spinner.show();
  }

  ngOnInit() {
     
    //this.spinner.hide();
  }

}
