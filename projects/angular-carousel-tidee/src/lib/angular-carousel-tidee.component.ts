import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AngularCarouselTideeService} from './angular-carousel-tidee.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'lib-angular-carousel-tidee',
  templateUrl: './lib-angular-carousel-tidee.html',
  styleUrls: ['./lib-angular-carousel-tidee.scss']
})
export class AngularCarouselTideeComponent implements OnInit, AfterViewInit {

  @Input() elements: Array<any>;
  @Input() direction = '';
  @Input() countPerFrame = 5;
  @Output() clickElement: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('carouselMain') carouselMain: ElementRef;
  @ViewChild('singleElement') singleElement: ElementRef;

  // @todo remove magic numbers
  viewCount = 7;
  middleNum = 4;
  shiftX = 0;
  shiftY = 0;
  subscription: Subscription;
  elementWidth = 150;
  elementBaseHeight = 55;
  elementMarginX = -5;
  elementMarginY = -5;
  frameNumber = 0;
  middleX = 0;
  magicMargin = 35;

  ELEMENT_WIDTH = 50;
  ELEMENT_HEIGHT = 50;

  constructor(public carouselService: AngularCarouselTideeService) {
    this.carouselService.prevClick$.subscribe(item => this.prevClick());
    this.carouselService.nextClick$.subscribe(item => this.nextClick());
  }

  ngOnInit() {
    this.subscription = this.carouselService.navItemNext$.subscribe(item => (item === 1) ? this.nextClick(1) : this.prevClick(1));
    // this.subscription = this.carouselService.navItemPrev$.subscribe(() => this.prevClick());
    console.log(this.getCenter());
    console.log(this.direction);
    // this.elementWidth = this.carouselMain.nativeElement.clientWidth / this.countPerFrame;
    this.elementWidth = 1 / this.countPerFrame * 100;
    this.elementMarginX = (this.direction === 'row') ?
      Math.floor(this.carouselMain.nativeElement.clientWidth / this.countPerFrame) - this.ELEMENT_WIDTH : 0;
    this.elementMarginY = (this.direction === 'column') ?
      Math.floor(this.carouselMain.nativeElement.clientHeight / this.countPerFrame) - this.ELEMENT_HEIGHT : 0;
    this.middleX = Math.floor(this.carouselMain.nativeElement.clientWidth / 2);
    console.log(this.middleX);
    console.log(this.elementWidth);
    this.elements = this.elements.map((x, i) => {
      // x.visible = i < this.countPerFrame;
      x.visible = 1;
      return x;
    });

  }

  ngAfterViewInit() {
    const w = document.querySelectorAll('.el-container');
    console.log(w);
    console.log(this.carouselMain.nativeElement.clientWidth / this.countPerFrame);
    console.log(this.carouselMain.nativeElement.clientWidth);
    console.log(this.elementMarginX);
    console.log(this.elements);
    // this.elementWidth = this.carouselMain.nativeElement.clientWidth / this.countPerFrame;
    // (w as any as Array<HTMLElement>).forEach(temp => temp.style.width = `${this.elementWidth}px`);

  }

  elClick(x, num, q) {
    console.log('---------');

    console.log(this.detectDirection(num));

    if (num - 2 > 0 && num + 4 < this.elements.length) {
      // const tempEl = Array.from(document.querySelectorAll('.el-container'));
      const tempEl = document.querySelectorAll('.el-container');
      console.log(this.shiftX);
      this.shiftX += 45 * this.detectDirection(num);
      console.log(this.shiftX);
      console.log(tempEl.length);

      // remove error:
      // Property 'forEach' does not exist on type 'NodeListOf<Element>'
      // (tempEl as any as Array<HTMLElement>).forEach(temp => temp.style.transform = `translate(${this.shiftX}px)`);
      this.carouselMain.nativeElement.style.transform = `translateX(${this.shiftX}px)`;
    }

    this.getTranslateElement(q);
    const activeNum = this.elements.findIndex(element => element.activated);
    this.changeActiveElement(activeNum, (-1) * this.detectDirection(num));
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

  nextClick(step?: number) {
    step = step || 1;
    const activeNum = this.elements.findIndex(element => element.activated);
    const moveCount = activeNum + step;
    if (moveCount < this.elements.length) {
      this.changeActiveElement(activeNum, step);
    } else {
      this.changeActiveElement(activeNum, this.elements.length - activeNum - 1);
    }

    if (activeNum - Math.floor(this.countPerFrame / 2) + step > 0
      && activeNum + Math.floor(this.countPerFrame / 2) < this.elements.length) {
      if (this.direction === 'row') {
        this.shiftX = -Math.floor(this.ELEMENT_WIDTH + this.elementMarginX) * (moveCount - this.countPerFrame / 2 + 1) + this.magicMargin;
        this.carouselMain.nativeElement.style.transform = `translateX(${this.shiftX}px)`;
      } else {
        this.shiftY = -Math.floor(this.ELEMENT_HEIGHT + this.elementMarginY) * (moveCount - this.countPerFrame / 2 + 1) + this.magicMargin;
        this.carouselMain.nativeElement.style.transform = `translateY(${this.shiftY}px)`;
      }
    }

  }

  prevClick(step?: number) {
    step = step || 1;
    const activeNum = this.elements.findIndex(element => element.activated);
    const moveCount = activeNum - step;
    console.log(moveCount, ' : ', step, ' : ', activeNum);
    if (moveCount >= 0) {
      this.changeActiveElement(activeNum, (-1) * step);
      // }
      if (activeNum + Math.floor(this.countPerFrame / 2) + step < this.elements.length
        && Math.floor(this.countPerFrame / 2) - moveCount <= activeNum + 1) {
        if (this.direction === 'row') {
          this.shiftX = -Math.floor(this.ELEMENT_WIDTH + this.elementMarginX) * (moveCount - this.countPerFrame / 2 + 1) + this.magicMargin;
          this.carouselMain.nativeElement.style.transform = `translateX(${this.shiftX}px)`;
        } else {
          this.shiftY = -Math.floor(this.ELEMENT_HEIGHT + this.elementMarginY) * (moveCount - this.countPerFrame / 2 + 1) + this.magicMargin;
          this.carouselMain.nativeElement.style.transform = `translateY(${this.shiftY}px)`;
        }
      }
    }
  }

  moveActive(num: number) {

  }

  changeActiveElement(num: number, direction: number): void {
    this.elements[num].activated = false;
    this.elements[num + direction].activated = true;
  }

  getTranslateElement(el) {
    console.log(el.style.transform);
    // console.log(el.style.transform.split('translate(')[1]);
    // q.split('(')[1].split('px')[1].split(' ')[1]
  }

  setClass(el) {
    let elementClass = el.activated ? 'activated' : '';
    elementClass += this.direction === 'column' ? ' column-elements' : '';
    return elementClass;
  }
}

