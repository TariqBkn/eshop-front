import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Models/Product';
import { ProductsService } from '../Services/products/products.service';
import { NotificationService } from '../Services/Notifications/notifications.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
 
  
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private productsService: ProductsService, private notificationService: NotificationService) { }
  
  ImagesNamesAndValues= new Map<string, string>();
  fileTypeIsNotCsv: boolean=false;
  productId: number;
  product: Product = new Product()
  fileData = null;

  productForm = this.formBuilder.group({
    id: [],
    title : ['', [Validators.required]],
    description: ['', [Validators.required]],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    color: ['', [Validators.required]],
    images: [],
    providerName: ['', [Validators.required]],
    promotionRatio: [,[Validators.required, Validators.min(0), Validators.max(1)]],
    quantityInStock: [0,[Validators.required, Validators.min(0)]],
  })

  newImageForm = this.formBuilder.group({
    image : [[Validators.required]]
  })

  ngOnInit(): void {
    this.getProductIdFromRoute();
    this.getProduct()
  }

  getProduct() {
    this.productsService.getProductById(this.productId).subscribe(
      response => {
        this.product = response;
        this.productForm.setValue(this.product)
        this.getProductImages()
      },
      error => {
        console.log(JSON.stringify(error))
        this.notificationService.warn("Le produit n'a pas pu être chargé.");
      }
    )
  }

  private getProductIdFromRoute() {
    this.productId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getImage(imageName: string){
    return this.ImagesNamesAndValues[imageName];
  }

  getProductImages() {
    this.product.images.forEach(image => {
      this.productsService.getImage(image.name).subscribe(
        response => console.log(JSON.stringify(" resresres "+response)),
        error => { 
           this.ImagesNamesAndValues[image.name]="data:image/jpg;base64,"+error.error.text;
        }
      )
    });
  }
  
  hasImages() {
    return this.product.images.length>0;
  }

  removeImage(imageName: string){
    if(confirm("Supprimer cette image?")){
      this.productsService.removeImage(this.productId, imageName).subscribe(
        resp => {
          this.notificationService.warn("L'image n'a pas pu être supprimée.")
          this.product.images=this.product.images.filter(image => image.name!=imageName);
        },
        err =>{
          this.notificationService.warn("L'image a été supprimée.")
          location.reload()
        }
      )
    }
  }
  numberOfImagesIsMaxedOut(){
     return this.product.images.length>=3
  }

  onClickSubmit(){
    const product = {
      id : this.product.id,
      title : this.productForm.get('title').value,
      description : this.productForm.get('description').value,
      unitPrice : this.productForm.get('unitPrice').value,
      color : this.productForm.get('color').value,
      providerName : this.productForm.get('providerName').value,
      promotionRatio : this.productForm.get('promotionRatio').value,
      quantityInStock : this.productForm.get('quantityInStock').value,
      images:[] 
    }
    this.productsService.updateProductData(product).subscribe(
      resp => {
        this.notificationService.warn("Modifications Enregistrés")
      },
      error => {
        this.notificationService.warn("Erreur inconnue.")
        console.warn(JSON.stringify(error))
      }
    )
  }

  public changeListener(fileInput: any){
      this.fileData = fileInput.target.files[0];
  }

  onAddImage(){
     //this.showSpinner=true
      if(!this.fileData){this.notificationService.warn("Veuillez selectionner une image.")}
      const formData = new FormData();
      formData.append("image", this.fileData, this.fileData.name);
      this.productsService.uploadImage(this.product.id, formData).subscribe(
       response=>{
          this.notificationService.warn("Image ajoutée.")
          location.reload()
       },
       error =>{
          this.notificationService.warn("L'image n'a pas pu être ajoutée.")
          location.reload()
       })
  }

}