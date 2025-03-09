import { TestBed } from '@angular/core/testing';

import { BankersConfigService } from './bankers-config.service';

describe('BankersConfigService', () => {
  let service: BankersConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankersConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
