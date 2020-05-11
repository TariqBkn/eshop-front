import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product : Product
  @Input() textOnly=false
  default_image: string="../../assets/images/notfound.png";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  products_images_base_url=environment.static_productImages_url;
  hasImages():boolean{
    return this.product.images.length>0
  } 
  goToDetails(){
     this.router.navigate(['/details',this.product.id])
  }
}
