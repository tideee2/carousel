import { TestBed } from '@angular/core/testing';

import { AngularCarouselTideeService } from './angular-carousel-tidee.service';

describe('AngularCarouselTideeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularCarouselTideeService = TestBed.get(AngularCarouselTideeService);
    expect(service).toBeTruthy();
  });
});
