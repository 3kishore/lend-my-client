import { TestBed } from '@angular/core/testing';

import { AcceptedClientDetailsConfigService } from './accepted-client-details-config.service';

describe('AcceptedClientDetailsConfigService', () => {
  let service: AcceptedClientDetailsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptedClientDetailsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
