import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../Services/products/products.service';
import { NgxSpinnerService } from "ngx-spinner";
 
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private spinner: NgxSpinnerService) {  }
  
  form = this.formBuilder.group({
    searchKeyWord:[]
  })

  products

  ngOnInit(): void {
    this.spinner.show()
    this.loadProductsFromServer();
  }



  private loadProductsFromServer() {
    this.productsService.getProducts().subscribe(resp => {
      console.log(JSON.stringify(resp.pageable));
      this.products = resp.content;
    });
  }

  ngAfterViewInit(){
    this.spinner.hide()
  }

}
