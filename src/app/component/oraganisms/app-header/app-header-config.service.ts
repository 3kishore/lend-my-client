import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AccountService } from '../../../services/api/account.service';

@Injectable()
export class AppHeaderConfigService {

  constructor(
    private accountService: AccountService
  ) {}

  logout(data: any) {
    return this.accountService.logout(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
}
