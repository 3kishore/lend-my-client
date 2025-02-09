import { TestBed } from '@angular/core/testing';

import { MyCommissionsConfigService } from './my-commissions-config.service';

describe('MyCommissionsConfigService', () => {
  let service: MyCommissionsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCommissionsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
