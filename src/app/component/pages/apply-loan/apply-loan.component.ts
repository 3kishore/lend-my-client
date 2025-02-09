import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TYPES_OF_LOAN } from '../../../services/models/apply-loan/constants/apply-loan.const';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationSuccessComponent } from '../../oraganisms/application-success/application-success.component';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';

@Component({
  selector: 'app-apply-loan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ApplicationSuccessComponent],
  templateUrl: './apply-loan.component.html',
  styleUrl: './apply-loan.component.scss'
})
export class ApplyLoanComponent {

  applyLoan: FormGroup;

  typesOfLoan = TYPES_OF_LOAN;

  subCategory = [];

  isDescriptionRequired = false;

  isApplicationFailed = false;

  message = '';

  readonly dialog = inject(MatDialog);

  sessionObj;

  constructor(
    private router: Router,
    private loanApplication: LoanApplicationsService,
    private fb: FormBuilder,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {
    this.applyLoan = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      middleName: [''],
      lastName: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])],
      mobileNumber: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
      loanType: ['', Validators.required],
      loanFor: ['', Validators.required],
      description: [''],
      loanAmount: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{6,}$/)])],
      remarks: ['']
    })
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  onCancel() {
    this.router.navigate(['/loan-application-status']);
  }

  onLoanTypeChange() {
    this.subCategory = this.typesOfLoan.find(x => x.label === this.applyLoan.value.loanType).category;
    this.applyLoan.get('loanFor').setValue('');
    this.applyLoan.get('description').setValue('');
  }

  onCategoryChange() {
    console.log(this.applyLoan.value.loanFor, this.applyLoan.value.loanFor === 'Others')
    if(this.applyLoan.value.loanFor === 'Others') {
      this.isDescriptionRequired = true;
      this.applyLoan.get('description').setValidators(Validators.compose([Validators.required, Validators.minLength(5)]));
    } else {
      this.isDescriptionRequired = false;
      this.applyLoan.get('description').setValidators(null);
    }
    this.applyLoan.get('description').setValue('');
    this.applyLoan.get('description').updateValueAndValidity();
  }

  submitApplication() {
    this.dataService.updateAppLoader(true);
    const payload = {
      ...this.applyLoan.value,
      referenceId: this.sessionObj.userDetail.userId,
      referenceEmail: this.sessionObj.userDetail.email,
      partnerName: `${this.sessionObj.userDetail.firstName} ${this.sessionObj.userDetail.lastName}`
    }
    this.loanApplication.applyForLoan(payload).subscribe({
      next: (resp: any) => {
        this.dataService.updateAppLoader(false);
        if(resp.status) {
          const dialogRef = this.dialog.open(ApplicationSuccessComponent, {disableClose: true});
          dialogRef.afterClosed().subscribe({
            next: (showLoanStatus) => {
              if(showLoanStatus) {
                this.router.navigate(['/loan-application-status']);
              } else {
                this.isApplicationFailed = false;
                this.message = '';
                this.applyLoan.reset();
              }
            }
          })
        } else {
          this.isApplicationFailed = true;
          this.message = resp.message;
        }
      }, error: (resp) => {
        this.dataService.updateAppLoader(false);
        this.isApplicationFailed = true;
        this.message = 'Something went wron please try again.';
      }
    })
  }
  
}
