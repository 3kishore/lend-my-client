import { TestBed } from '@angular/core/testing';

import { ApplicationStatusConfigService } from './application-status-config.service';

describe('ApplicationStatusConfigService', () => {
  let service: ApplicationStatusConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationStatusConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
