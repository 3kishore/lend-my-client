import { TestBed } from '@angular/core/testing';

import { OrderDetailConfigService } from './order-detail-config.service';

describe('OrderDetailConfigService', () => {
  let service: OrderDetailConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
