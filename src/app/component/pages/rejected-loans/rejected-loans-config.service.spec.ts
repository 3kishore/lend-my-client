import { TestBed } from '@angular/core/testing';

import { RejectedLoansConfigService } from './rejected-loans-config.service';

describe('RejectedLoansConfigService', () => {
  let service: RejectedLoansConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedLoansConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
