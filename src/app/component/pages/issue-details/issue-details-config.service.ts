import { Injectable } from '@angular/core';
import { AccountService } from '../../../services/api/account.service';
import { catchError, map } from 'rxjs';

@Injectable()
export class IssueDetailsConfigService {

  constructor(private accService: AccountService) { }

  getIssueDetails(payload: any) {
    return this.accService.getIssueDetails(payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
  
}
