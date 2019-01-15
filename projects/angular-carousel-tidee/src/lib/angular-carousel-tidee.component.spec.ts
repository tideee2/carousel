import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCarouselTideeComponent } from './angular-carousel-tidee.component';

describe('AngularCarouselTideeComponent', () => {
  let component: AngularCarouselTideeComponent;
  let fixture: ComponentFixture<AngularCarouselTideeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularCarouselTideeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCarouselTideeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
