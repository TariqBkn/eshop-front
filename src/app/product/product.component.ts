import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ProductsService } from '../Services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product : Product
  @Input() textOnly=false
  default_image: string="../../assets/images/notfound.png";

  constructor(private router: Router, private productsService : ProductsService) { }

  ngOnInit(): void {
    if(this.hasImages()) this.getProductImage()
  }
  products_images_base_url=environment.static_productImages_url;
  image=""
  hasImages():boolean{
    return this.product.images.length>0
  } 
  goToDetails(){
     this.router.navigate(['/details',this.product.id])
  }

  getProductImage() {
      this.productsService.getImage(this.product.images[0].name).subscribe(
        response => console.log(JSON.stringify(response)),
        error => { 
          this.image="data:image/jpg;base64,"+error.error.text;
        }
      )
  }
}
