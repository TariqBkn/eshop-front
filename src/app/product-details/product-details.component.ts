import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Models/Product'
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment'
import { ProductsService } from '../Services/products/products.service';
import { NotificationService } from '../Services/Notifications/notifications.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderLine } from '../Models/OrderLine';
import { OrderLinesService } from '../Services/orderLines/order-lines.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  products_images_base_url=environment.static_productImages_url;
  product : Product = new Product();
  active_image:string
  previous_image:string
  productId :number
  constructor(private spinner: NgxSpinnerService,
              private productsService: ProductsService,
              private notificationsService : NotificationService,
              private orderLinesService: OrderLinesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute){
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.spinner.show();
  }

  ngOnInit() {
    
    this.getProductIdFromRoute();

    this.loadProductDetails();
    
     this.spinner.hide();
  } 

  hasImages(){
    if(this.product.images) { return this.product.images.length>0 }
    return false
  }
  
  buyForm = this.formBuilder.group({
    productId: [this.product.id],
    quantity :[1,[Validators.required, Validators.min(1)]],
  });
  
  private getProductIdFromRoute() {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  private loadProductDetails() {
    this.productsService.getProductById(this.productId).subscribe(response => {
      this.product = response;
      if(this.product.images && this.product.images.length) this.active_image = this.product.images[0].name;
      this.productId = this.product.id;
    }, error => {
      if (error.status == 404) {
        this.notificationsService.warn("Ce produit n'est plus dans la base de données.");
        this.router.navigate(['']);
      }
    });
  }

  setActiveImage(image_name:string){
    this.previous_image=this.active_image
    this.active_image=image_name
  }

  onClickSubmit(){
    if(this.product.quantityInStock<this.buyForm.get('quantity').value){
      this.notificationsService.warn('Quantité erronée, ne pas dépasser la quantité en stock!')
      return;
    }
    let orderLine = new OrderLine(this.product, parseInt(this.buyForm.get('quantity').value));
    this.orderLinesService.addOrderLine(orderLine).subscribe(
      resp =>{
          this.notificationsService.warn("Commande Ajoutée.")
          this.router.navigate(['cart'])
        },
      err=>{
        if(err.status==422){ this.notificationsService.warn("Vous avez dépasser la quantité en stock de ce produit.")}
        console.log("erroor*****"+JSON.stringify(err))
      }
    )
  }


}