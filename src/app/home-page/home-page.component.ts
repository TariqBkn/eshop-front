import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../Services/products/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) { }
  
  form = this.formBuilder.group({
    searchKeyWord:[]
  })

  products

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      resp => {
        console.log(JSON.stringify(resp.content))
        this.products = resp.content
      }
    )
  }

  
}
