import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../Services/products/products.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { NotificationService } from '../Services/Notifications/notifications.service';
 
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
 

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private spinner: NgxSpinnerService, private notificationsService: NotificationService) {  }
    visible = true;
    selectable = true;
    addOnBlur = true;
    keywords: string[] = new Array();
    readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];


    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.input.value;
 
      if ((value || '').trim()) {
        if(!this.keywords.includes(value.trim())) { 
          this.keywords.push(value.trim());
          this.searchByKeywords()
        }
      }

      if (value) {
        input.value = '';
      }
    }

    remove(keywordToRemove: string): void {
      this.keywords=this.keywords.filter(keyword => keyword!=keywordToRemove)
      this.searchByKeywords()
    }
 
  form = this.formBuilder.group({
    keywords:[]
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

  searchByKeywords(){
    if(this.keywords.length>0){
      this.productsService.searchByKeywords(this.keywords).subscribe(
        resp => {
            this.products=resp;
        },
        err => {
          this.notificationsService.warn("Impossible d'éffectuer la recherche")
          console.log(JSON.stringify(err))
        }
      )
    }else{
      this.loadProductsFromServer();
    }
  }
}
