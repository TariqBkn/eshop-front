import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../Services/products/products.service';
import { SimilarProduct } from '../Models/SimilarProduct';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
  inputs: ['productId']
})
export class SimilarProductsComponent implements OnInit {
  @Input('productId') productId : number;
  similarProducts: SimilarProduct[]
  constructor(private productsService : ProductsService) {  console.log("ggggg ------------------------------------"+this.productId)
}

  ngOnInit(): void {
    this.loadSimilarProducts();
  }

  private loadSimilarProducts() {
    this.productsService.getSimilarProducts(this.productId).subscribe(resp => {
      this.similarProducts = resp;
    }, error => {
      console.log("error in similar products", JSON.stringify(error));
    });
  }

  ngOnChanges() {
    this.loadSimilarProducts();
  }
}
