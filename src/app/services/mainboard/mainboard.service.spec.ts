import { TestBed } from '@angular/core/testing';

import { MainboardService } from './mainboard.service';

describe('MainboardService', () => {
  let service: MainboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
