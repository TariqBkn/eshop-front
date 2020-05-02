import { Component, OnInit } from '@angular/core';
import { fade, slide } from '../animations';
import { FormBuilder  } from '@angular/forms';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
  animations: [
    fade,
    slide
  ]
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
