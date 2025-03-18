import { TestBed } from '@angular/core/testing';

import { CompletedOrdersConfigService } from './completed-orders-config.service';

describe('CompletedOrdersConfigService', () => {
  let service: CompletedOrdersConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedOrdersConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
