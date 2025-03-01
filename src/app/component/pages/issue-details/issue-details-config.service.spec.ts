import { TestBed } from '@angular/core/testing';

import { IssueDetailsConfigService } from './issue-details-config.service';

describe('IssueDetailsConfigService', () => {
  let service: IssueDetailsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssueDetailsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
