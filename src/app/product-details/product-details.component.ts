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
import { AuthenticationService } from '../Services/Authentication/authentication-service.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product : Product = new Product();
  active_image:string
  previous_image:string
  productId :number
  ImagesNamesAndValues = new Map<string, string>();  
  
  constructor(private spinner: NgxSpinnerService,
              private productsService: ProductsService,
              private notificationsService : NotificationService,
              private orderLinesService: OrderLinesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService){
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.spinner.show();
  }

  ngOnInit() {
    
    this.getProductIdFromRoute();

    this.loadProductDetails();
    
  
     this.spinner.hide();
  } 
  getProductImages() {
    this.product.images.forEach(image => {
      this.productsService.getImage(image.name).subscribe(
        response => console.log(JSON.stringify(response)),
        error => { 
          this.ImagesNamesAndValues[image.name]="data:image/jpg;base64,"+error.error.text;
          if(this.hasImages()) this.active_image=this.product.images[0].name
        }
      )
    });
  }

  hasImages(){
    return this.product.images.length>0;
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
      this.productId = this.product.id;
      this.getProductImages();
    }, error => {
      if (error.status == 404) {
        this.notificationsService.warn("Ce produit n'est plus dans la base de données.");
        this.router.navigate(['']);
      }
    });
  }

  getImage(imageName: string){
    return this.ImagesNamesAndValues[imageName];
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


  goToEdit(){
    this.router.navigate(['products',this.product.id,'edit'])
  }

  isUserAdmin(){
    return this.authenticationService.isCurrentUserAdmin()
  }
}