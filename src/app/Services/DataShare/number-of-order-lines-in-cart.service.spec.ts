import { TestBed } from '@angular/core/testing';

import { NumberOfOrderLinesInCartService } from './number-of-order-lines-in-cart.service';

describe('NumberOfOrderLinesInCartService', () => {
  let service: NumberOfOrderLinesInCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberOfOrderLinesInCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
