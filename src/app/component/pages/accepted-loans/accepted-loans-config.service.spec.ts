import { TestBed } from '@angular/core/testing';

import { AcceptedLoansConfigService } from './accepted-loans-config.service';

describe('AcceptedLoansConfigService', () => {
  let service: AcceptedLoansConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedLoansConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
