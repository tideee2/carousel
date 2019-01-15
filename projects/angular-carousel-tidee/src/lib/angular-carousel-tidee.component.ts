import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'lib-angular-carousel-tidee',
  templateUrl: './lib-angular-carousel-tidee.html',
  styleUrls: ['./lib-angular-carousel-tidee.scss']
})
export class AngularCarouselTideeComponent implements OnInit {

  @Input() elements: Array<any>;
  @Input() direction = '';
  @Output() clickElement: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('carouselMain') carouselMain: ElementRef;
  @ViewChild('singleElement') singleElement: ElementRef;

  // @todo remove magic numbers
  viewCount = 7;
  middleNum = 4;
  leftShift = 45;

  constructor() {
  }

  ngOnInit() {
    console.log(this.getCenter());
    console.log(this.direction);
  }

  elClick(x, num, q) {
    console.log('---------');
    console.log(x.id, ':', num);
    console.log(q.clientWidth);
    console.log(this.carouselMain.nativeElement.clientWidth);
    console.log((q.clientWidth - 10) * this.elements.length);
    // if (x.id - 4 > 0) {
    //   this.leftShift -= 45; // @todo magic number replace to element width
    // } else if (x.id + 4 > this.elements.length) {
    //   this.leftShift += 45; // @todo magic number replace to element width
    // }
    console.log(this.detectDirection(num));
    if (num - 2 > 0 && num + 4 < this.elements.length) {
      let tempEl = document.querySelectorAll('.el-container');
      this.leftShift += 45 * this.detectDirection(num);
      console.log(this.leftShift);
      tempEl.forEach(temp => temp.style.transform = `translate(${this.leftShift}px)`);
    }


    this.clickElement.emit(x.id);

  }

  findActive() {
    return (this.elements) ? this.elements.findIndex(x => x.activated) : 0;
  }

  isOut(num) {
    // return num === this.elements.length - 1 || num === 0;
    return 0;
  }

  findPosition(num) {
    return this.isOut(num) ? this.elements.length : this.elements.length - Math.abs(this.findActive() - num);
  }

  findOpacity(num) {
    return this.findPosition(num) / this.elements.length;
  }

  getCenter() {
    return Math.floor(this.elements.length / 2);
  }

  detectDirection(num) {
    return this.elements.findIndex(x => x.activated === true) - num;
  }
}

