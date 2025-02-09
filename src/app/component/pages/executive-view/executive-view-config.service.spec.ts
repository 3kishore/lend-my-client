import { TestBed } from '@angular/core/testing';

import { ExecutiveViewConfigService } from './executive-view-config.service';

describe('ExecutiveViewConfigService', () => {
  let service: ExecutiveViewConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutiveViewConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
