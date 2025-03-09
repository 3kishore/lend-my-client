import { TestBed } from '@angular/core/testing';

import { CompletedLoansConfigService } from './completed-loans-config.service';

describe('CompletedLoansConfigService', () => {
  let service: CompletedLoansConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedLoansConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
