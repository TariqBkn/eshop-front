import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product'
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor() { }
  @Input('immobilier') product : Product;
  ngOnInit(): void {
  }

}
