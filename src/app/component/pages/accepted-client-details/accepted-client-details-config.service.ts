import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { AccountService } from '../../../services/api/account.service';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';

@Injectable()
export class AcceptedClientDetailsConfigService {

  constructor(
    private loanService: LoanApplicationsService,
    private accountService: AccountService
  ) { }

  getUpdateLoanDetailsConfig(): IButton {
    const btnConfig: IButton = {
      id: 'update-loan-details',
      label: 'Update Loan Details',
      type: EButtonType.PRIMARY,
      isDisabled: true
    }
    return btnConfig
  }
  getLaonDetails(payload) {
    return this.loanService.getLoanDetails(payload).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }

  getOrderDetails(data: any) {
    return this.accountService.getOrderDetails(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  updateDesposementStatus(data: any) {
    return this.accountService.updateDesposementStatus(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  updateLoanDetails(data: any) {
    return this.accountService.updateLoanDetails(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
}
