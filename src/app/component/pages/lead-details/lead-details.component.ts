import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { LeadDetailsConfigService } from './lead-details-config.service';
import { APP } from '../../../utils/constants/APP.const';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IButton } from '../../atoms/button/button.interface';
import { ConfirmationModalComponent } from '../../oraganisms/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, ConfirmationModalComponent],
  providers: [LeadDetailsConfigService],
  templateUrl: './lead-details.component.html',
  styleUrl: './lead-details.component.scss'
})
export class LeadDetailsComponent {

  customerDetailsLoader = true;

  customerDetails: any;

  component$ = new Subscription();

  queryParams: any;

  loanDetails: FormGroup;

  updateLoanDetailsBtn: IButton;

  isLoanDetailsLoading = true;

  lastestLoanDetails: any = {};

  readonly dialog = inject(MatDialog);

  @ViewChild('alertContentTemplate', { static: true })
    public alertContentTemplate: TemplateRef<any>;

  @ViewChild('alertActionTemplate', { static: true })
    public alertActionTemplate: TemplateRef<any>;

  closeBtnConfig: IButton = {
    id: 'close-btn',
    label: 'Close',
    type: EButtonType.PRIMARY,
    isDisabled: false
  };

  rejectBtnConfig: IButton = {
    id: 'reject',
    label: 'Reject',
    type: EButtonType.PRIMARY,
    customclass: 'danger'
  }

  proposalBtnConfig: IButton = {
    id: 'send-proposal',
    label: 'Send Proposal',
    type: EButtonType.PRIMARY,
    customclass: 'success'
  }

  isValueChangeDetected = false;

  sessionObj: any;

  loanRejectionReason = '';

  private _snackBar = inject(MatSnackBar);

  constructor(
    private router: Router,
    private config: LeadDetailsConfigService,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.updateLoanDetailsBtn = config.getUpdateLoanDetailsConfig();
    this.loanDetails = this.fb.group({
      maxLoanAmount: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4,9}$/)])],
      rateOfInterest: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{1,2}(\.\d+)?$/)])],
      maxLoanTenure: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{1,3}$/)])],
      emiPerMonth: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{2,7}$/)])],
      maxFoir: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{2,7}$/)])],
      processingFee: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{2,6}$/)])],
      otherCharges: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{2,6}$/)])],
      advantage: ['']
    })
    this.activatedRouter.params.subscribe({
      next: (resp: any) => {
        this.queryParams = resp;
        this.getLoanDetails();
        this.getOrderDetails();
      }
    })
    this.loanDetails.valueChanges.subscribe({
      next: (_) => {
        this.updateLoanDetailsBtn.isDisabled = this.loanDetails.valid ? false : true;
        // if(this.loanDetails.value.maxLoanAmount != this.lastestLoanDetails.maxLoanAmount || this.loanDetails.value.rateOfInterest != this.lastestLoanDetails.rateOfInterest) {
        //   this.updateLoanDetailsBtn.isDisabled = false;
        // } else {
        //   this.updateLoanDetailsBtn.isDisabled = true;
        // }
      }
    })
  }

  refresh() {
    this.getOrderDetails();
    this.getLoanDetails();
  }

  back() {
    this.router.navigate([APP.ROUTES.MY_LEADS]);
  }

  getLoanDetails() {
    this.isLoanDetailsLoading = true;
    this.component$.add(
      this.component$.add(
        this.config.getLaonDetails({requestId: this.queryParams.loanId, bankerId: this.sessionObj.userDetail.userId}).subscribe({
          next: (resp: any) => {
            this.isLoanDetailsLoading = false;
            if(resp.status) {
              this.lastestLoanDetails = resp.content;
              this.loanDetails.patchValue({
                maxLoanAmount: resp.content.maxLoanAmount,
                rateOfInterest: resp.content.rateOfInterest,
                maxLoanTenure: resp.content.maxLoanTenure,
                emiPerMonth: resp.content.emiPerMonth,
                maxFoir: resp.content.maxFoir,
                processingFee: resp.content.processingFee,
                otherCharges: resp.content.otherCharges,
                advantage: resp.content.advantage
              })
              this.loanDetails.updateValueAndValidity();
            }
          }, error: (err) => {
            this.isLoanDetailsLoading = false;
          }
        })
      )
    )
  }

  getOrderDetails() {
    this.customerDetailsLoader = true;
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

  updateLoanDetails() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {hasBackdrop: true, data: {}});
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        console.log(resp, this.loanDetails.value)
        if(resp) {
          const payload = {
            ...this.loanDetails.value,
            loanId: this.queryParams.loanId,
            bankerId: this.sessionObj.userDetail.userId
          }
          this.config.updateLoanDetails(payload).subscribe({
            next: (resp) => {
              if(resp.status) {
                this._snackBar.open('Loan Details Has Been Updated Successfully', '', {panelClass: ['success-snackbar'], duration: 6000});
              } else {
                this._snackBar.open('Failed To Updated Loan Details Has Been', '', {panelClass: ['danger-snackbar'], duration: 6000});
              }
            }, error: (err) => {
              this._snackBar.open('Failed To Updated Loan Details Has Been', '', {panelClass: ['danger-snackbar'], duration: 6000});
            }
          })
        }
      }
    })
  }

  sendProposal() {
    this.lastestLoanDetails.loanStatus = 'update loan detail';
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
            isLoanAccepted: false
          }
          console.log(payload)
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

  closeDialog() {
    this.dialog.closeAll();
  }
  
}
