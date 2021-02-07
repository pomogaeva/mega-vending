import { TestBed } from '@angular/core/testing';

import { HomeSlidesService } from './home-slides.service';

describe('HomeSlidesService', () => {
  let service: HomeSlidesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSlidesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
