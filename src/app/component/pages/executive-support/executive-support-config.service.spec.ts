import { TestBed } from '@angular/core/testing';

import { ExecutiveSupportConfigService } from './executive-support-config.service';

describe('ExecutiveSupportConfigService', () => {
  let service: ExecutiveSupportConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveSupportConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
