import { TestBed } from '@angular/core/testing';

import { MockRobotsService } from './mock-robots.service';

describe('MockRobotsService', () => {
  let service: MockRobotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockRobotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
