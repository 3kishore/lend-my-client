import { Injectable } from '@angular/core';
import { AccountService } from '../../../services/api/account.service';
import { catchError, map } from 'rxjs';

@Injectable()
export class CreateSupportTicketConfigService {

  constructor(
      private accService: AccountService
    ) {}
  
    createSupportTicket(payload: any) {
      return this.accService.createSupportTicket(payload).pipe(
        map(resp => resp),
        catchError(err => err)
      )
    }
}
