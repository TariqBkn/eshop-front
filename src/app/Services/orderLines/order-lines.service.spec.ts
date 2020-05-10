import { TestBed } from '@angular/core/testing';

import { OrderLinesService } from './order-lines.service';

describe('OrderLinesService', () => {
  let service: OrderLinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderLinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
