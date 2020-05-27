import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images = [ "../../assets/images/carousel1.png", "../../assets/images/carousel2.jpg", "../../assets/images/carousel3.jpg"]; 
  constructor() { }

  ngOnInit(): void {
    
  }

}
