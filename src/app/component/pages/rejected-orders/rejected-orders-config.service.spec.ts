import { TestBed } from '@angular/core/testing';

import { RejectedOrdersConfigService } from './rejected-orders-config.service';

describe('RejectedOrdersConfigService', () => {
  let service: RejectedOrdersConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedOrdersConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
