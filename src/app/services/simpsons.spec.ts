import { TestBed } from '@angular/core/testing';

import { SimpsonsService } from './simpsons';

describe('Simpsons', () => {
  let service: SimpsonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpsonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
