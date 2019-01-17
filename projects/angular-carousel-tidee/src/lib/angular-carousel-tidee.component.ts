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
  leftShift = 0;
  subscription: Subscription;
  elementWidth = 150;
  elementBaseHeight = 55;
  elementMargin = -5;
  frameNumber = 0;
  middleX = 0;
  magicMargin = 35;

  ELEMENT_WIDTH = 50;

  constructor(public carouselService: AngularCarouselTideeService) {
    this.carouselService.prevClick$.subscribe(item => this.prevClick());
    this.carouselService.nextClick$.subscribe(item => this.nextClick());
  }

  ngOnInit() {
    this.subscription = this.carouselService.navItemNext$.subscribe(item => (item === 1) ? this.nextClick() : this.prevClick());
    // this.subscription = this.carouselService.navItemPrev$.subscribe(() => this.prevClick());
    console.log(this.getCenter());
    console.log(this.direction);
    // this.elementWidth = this.carouselMain.nativeElement.clientWidth / this.countPerFrame;
    this.elementWidth = 1 / this.countPerFrame * 100;
    this.elementMargin = Math.floor(this.carouselMain.nativeElement.clientWidth / this.countPerFrame) - this.ELEMENT_WIDTH;
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
    console.log(this.elementMargin);
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
      console.log(this.leftShift);
      this.leftShift += 45 * this.detectDirection(num);
      console.log(this.leftShift);
      console.log(tempEl.length);

      // remove error:
      // Property 'forEach' does not exist on type 'NodeListOf<Element>'
      // (tempEl as any as Array<HTMLElement>).forEach(temp => temp.style.transform = `translate(${this.leftShift}px)`);
      this.carouselMain.nativeElement.style.transform = `translateX(${this.leftShift}px)`;
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

  nextClick() {
    const activeNum = this.elements.findIndex(element => element.activated);
    if (activeNum + 1 < this.elements.length) {
      this.changeActiveElement(activeNum, 1);
      if (activeNum - Math.floor(this.frameNumber / 2) > 0) {
        this.leftShift = -Math.floor(this.ELEMENT_WIDTH + this.elementMargin) * activeNum + this.magicMargin;
        this.carouselMain.nativeElement.style.transform = `translateX(${this.leftShift}px)`;
      }
    }
  }

  prevClick() {
    const activeNum = this.elements.findIndex(element => element.activated);
    if (activeNum > 0) {
      this.changeActiveElement(activeNum, -1);
      if (activeNum + Math.floor(this.frameNumber / 2) < this.elements.length - 1) {
        this.leftShift = -Math.floor(this.ELEMENT_WIDTH + this.elementMargin) * (activeNum - 1) + this.magicMargin;
        this.carouselMain.nativeElement.style.transform = `translateX(${this.leftShift}px)`;
      }
    }
    // this.elements = this.elements.map((x, i) => {
    //   x.visible = (this.frameNumber + i < this.countPerFrame) && (i > this.frameNumber) ;
    // });
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
}

