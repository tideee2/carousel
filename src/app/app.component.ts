import { Component } from '@angular/core';
import {ELEMENTS} from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-carousel-tideee';
  entryArray = ELEMENTS;
  carouselDirection = 'row';
  changeActive(x) {
    this.entryArray.forEach(el => el.activated = false);
    this.entryArray[x - 1].activated = true;
  }

  constructor() {
    console.log(this.title);
  }

}
