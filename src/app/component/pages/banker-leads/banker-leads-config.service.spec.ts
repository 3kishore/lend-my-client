import { TestBed } from '@angular/core/testing';

import { BankerLeadsConfigService } from './banker-leads-config.service';

describe('BankerLeadsConfigService', () => {
  let service: BankerLeadsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankerLeadsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
