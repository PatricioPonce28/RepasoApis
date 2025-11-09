import { TestBed } from '@angular/core/testing';

import { RickandmortyService } from './rickandmorty';

describe('Rickandmorty', () => {
  let service: RickandmortyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickandmortyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
