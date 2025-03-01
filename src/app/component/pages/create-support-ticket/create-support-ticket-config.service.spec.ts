import { TestBed } from '@angular/core/testing';

import { CreateSupportTicketConfigService } from './create-support-ticket-config.service';

describe('CreateSupportTicketConfigService', () => {
  let service: CreateSupportTicketConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSupportTicketConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
