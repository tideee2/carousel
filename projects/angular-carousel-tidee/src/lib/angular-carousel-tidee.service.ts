import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularCarouselTideeService {
  public prevClick$: EventEmitter<any>;
  public nextClick$: EventEmitter<any>;

  private _nextClickSubject = new BehaviorSubject<any>(null);
  navItemNext$ = this._nextClickSubject.asObservable();
  // navItemPrev$ = this._nextClickSubject.asObservable();
  constructor() {
    this.prevClick$ = new EventEmitter();
    this.nextClick$ = new EventEmitter();
  }

  prev() {
    // this.prevClick$.emit('qq');
    this._nextClickSubject.next(-1);
  }

  next() {
    // this.nextClick$.emit('qq');
    this._nextClickSubject.next(1);
  }
}
