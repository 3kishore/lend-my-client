import { TestBed } from '@angular/core/testing';

import { BankersDetailConfigService } from './bankers-detail-config.service';

describe('BankersDetailConfigService', () => {
  let service: BankersDetailConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankersDetailConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
