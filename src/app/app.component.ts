import { Component } from '@angular/core';
import {ELEMENTS} from './data';
import {AngularCarouselTideeService} from '../../projects/angular-carousel-tidee/src/lib/angular-carousel-tidee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-carousel-tideee';
  entryArray = ELEMENTS;
  carouselDirection = 'row';
  changeActive(x) {
    this.entryArray.forEach(el => el.activated = false);
    this.entryArray[x - 1].activated = true;
  }



  constructor(public carouselService: AngularCarouselTideeService) {
    console.log(this.title);
  }

}
