import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../Services/products/products.service';
import { SimilarProduct } from '../Models/SimilarProduct';
import { NotificationService } from '../Services/Notifications/notifications.service';

@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
  inputs: ['productId']
})
export class SimilarProductsComponent implements OnInit {
  @Input('productId') productId : number;
  similarProducts: SimilarProduct[]
  constructor(private productsService : ProductsService, private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.loadSimilarProducts();
  }

  private loadSimilarProducts() {
    if(!this.productId) return
    this.productsService.getSimilarProducts(this.productId).subscribe(resp => {
      this.similarProducts = resp;
    }, error => {
      this.notificationService.warn("Erreur de chargement des produits similaires")
      console.log("error in similar products", JSON.stringify(error));
    });
  }

  ngOnChanges() {
    this.loadSimilarProducts();
  }
}
