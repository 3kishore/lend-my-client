import { TestBed } from '@angular/core/testing';

import { RejectedApplicationsConfigService } from './rejected-applications-config.service';

describe('RejectedApplicationsConfigService', () => {
  let service: RejectedApplicationsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectedApplicationsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
