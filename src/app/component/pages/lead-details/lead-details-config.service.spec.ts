import { TestBed } from '@angular/core/testing';

import { LeadDetailsConfigService } from './lead-details-config.service';

describe('LeadDetailsConfigService', () => {
  let service: LeadDetailsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadDetailsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
