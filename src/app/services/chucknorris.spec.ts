import { TestBed } from '@angular/core/testing';

import { ChucknorrisService } from './chucknorris';

describe('Chucknorris', () => {
  let service: ChucknorrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChucknorrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
