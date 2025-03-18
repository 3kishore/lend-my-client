import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IButton } from '../../atoms/button/button.interface';
import { MatDialog } from '@angular/material/dialog';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';
import { ConfirmationModalComponent } from '../../oraganisms/confirmation-modal/confirmation-modal.component';
import { AcceptedClientDetailsConfigService } from './accepted-client-details-config.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-accepted-client-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, FormsModule, MatMenuModule, ConfirmationModalComponent],
  providers: [AcceptedClientDetailsConfigService],
  templateUrl: './accepted-client-details.component.html',
  styleUrl: './accepted-client-details.component.scss'
})
export class AcceptedClientDetailsComponent {

  customerDetailsLoader = true;

  isLoanDetailsLoading = true;
  
  customerDetails: any;

  component$ = new Subscription();

  queryParams: any;

  loanDetails: any = {};

  updateLoanDetailsBtn: IButton;

  readonly dialog = inject(MatDialog);

  closeBtnConfig: IButton = {
    id: 'close-btn',
    label: 'Close',
    type: EButtonType.PRIMARY,
    isDisabled: false
  };

  manageConfig: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'manage',
    label: 'Manage',
    isDisabled: false,
    isActive: true,
    rightIconPath: '../../../../assets/icons/arrow-down-fill.svg'
  };

  actionList = [
    'Executive Assigned',
    'Contacted Client',
    'Client Agreed',
    'Loan Sanctioned',
    'Loan Disposed',
    'Reject'
  ]

  isValueChangeDetected = false;

  sessionObj: any;

  loanRejectionReason = '';

  private _snackBar = inject(MatSnackBar);

  @ViewChild('alertPopupContentTemplate', {static: true})
    alertPopupContentTemplate: TemplateRef<any>

  @ViewChild('alertContentTemplate', { static: true })
    public alertContentTemplate: TemplateRef<any>;

  constructor(
    private router: Router,
    private config: AcceptedClientDetailsConfigService,
    private activatedRouter: ActivatedRoute,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.updateLoanDetailsBtn = config.getUpdateLoanDetailsConfig();
    this.activatedRouter.params.subscribe({
      next: (resp: any) => {
        this.queryParams = resp;
        this.getLoanDetails();
        this.getOrderDetails();
      }
    })
  }

  refresh() {
    this.getOrderDetails();
    this.getLoanDetails();
  }

  back() {
    this.router.navigate([APP.ROUTES.ACCEPETD_LEADS]);
  }

  getLoanDetails() {
    this.isLoanDetailsLoading = true;
    this.component$.add(
      this.component$.add(
        this.config.getLaonDetails({requestId: this.queryParams.loanId, bankerId: this.sessionObj.userDetail.userId}).subscribe({
          next: (resp: any) => {
            this.isLoanDetailsLoading = false;
            if(resp.status) {
              this.loanDetails = resp.content;
            }
          }, error: (err) => {
            this.isLoanDetailsLoading = false;
          }
        })
      )
    )
  }

  getOrderDetails() {
    this.customerDetailsLoader = false;
    this.component$.add(
      this.config.getOrderDetails({requestId: this.queryParams.loanId}).subscribe({
        next: (resp: any) => {
          this.customerDetailsLoader = false;
          if(resp.status) {
            this.customerDetails = resp.content;
          }
        },
        error: (err) => {
          this.customerDetailsLoader = false;
        }
      })
    )
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  updateDesposementStatus(status: string) {
    const payload = {
      loanId: this.queryParams.loanId,
      bankerId: this.sessionObj.userDetail.userId,
      email: this.customerDetails.email,
      desposementStatus: (status.toLocaleLowerCase() === 'loan disposed') ? 'completed' : status.toLocaleLowerCase(),
      referenceEmail: this.customerDetails.referenceEmail,
      referenceId: this.customerDetails.referenceId
    }
    this.component$.add(
      this.config.updateDesposementStatus(payload).subscribe({
        next: (resp: any) => {
          this.customerDetailsLoader = false;
          if(resp.status) {
            this.customerDetails = resp.content;
          }
        },
        error: (err) => {
          this.customerDetailsLoader = false;
        }
      })
    )
  }

  openActionPopup(data: string) {
    data.toLocaleLowerCase() === 'reject' ? this.rejectLoan() : this.openAcceptProposalPopup(data);
  }

  openAcceptProposalPopup(data) {
    const dialogRef = this.dialog.open(
      ConfirmationModalComponent,
      {
        // hasBackdrop: true,
        data: {
          contentTemplate: this.alertPopupContentTemplate,
          data: data
        }
      }
    );
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        console.log('resp', resp)
        if(resp) {
          this.updateDesposementStatus(data);
        }
      }
    })
  }


  rejectLoan() {
    this.loanRejectionReason = '';
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {hasBackdrop: true, data: {contentTemplate: this.alertContentTemplate}});
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        if(resp) {
          const payload = {
            loanId: this.queryParams.loanId,
            bankerId: this.sessionObj.userDetail.userId,
            reasonForRejection: !this.loanRejectionReason ? 'Banker rejects your loan' : this.loanRejectionReason,
            isLoanAccepted: true
          }
          this.component$.add(
            this.config.rejectLoan(payload).subscribe({
              next: (resp) => {
                if(resp.status) {
                  this._snackBar.open('Status has been updated successfully.', '', {panelClass: ['success-snackbar'], duration: 6000});
                } else {
                  this._snackBar.open('Failed to updated the status.', '', {panelClass: ['danger-snackbar'], duration: 6000});
                }
              }, error: (err) => {
                this._snackBar.open('Failed to updated the status.', '', {panelClass: ['danger-snackbar'], duration: 6000});
              }
            })
          )
        }
      }
    })
  }
}
