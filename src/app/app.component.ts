import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eshop-front';
  
  constructor(private spinner: NgxSpinnerService){
    this.spinner.show();
   }

  ngOnInit() {
     
    this.spinner.hide();
  }
}
