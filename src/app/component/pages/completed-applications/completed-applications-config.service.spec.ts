import { TestBed } from '@angular/core/testing';

import { CompletedApplicationsConfigService } from './completed-applications-config.service';

describe('CompletedApplicationsConfigService', () => {
  let service: CompletedApplicationsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompletedApplicationsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
