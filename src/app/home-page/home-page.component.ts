import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  form = this.formBuilder.group({
    searchKeyWord:[]
  })
   
  ngOnInit(): void {
   }

  
}
