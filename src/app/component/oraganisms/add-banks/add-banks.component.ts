import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../services/api/account.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'add-banks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-banks.component.html',
  styleUrl: './add-banks.component.scss'
})
export class AddBankComponent implements OnInit {

  readonly dialogRef = inject(MatDialogRef<AddBankComponent>);

  readonly data = inject(MAT_DIALOG_DATA);
  
  addBank: FormGroup;

  sessionObj;

  userId = '';

  banks = []

  isUpdationFailed = false;

  constructor(
    private fb: FormBuilder,
    private accService: AccountService,
    private dataService: AppDataService,
    private commonService: CommonHelperService,
    private loanService: LoanApplicationsService
  ) {
    this.addBank = this.fb.group({
      bank: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      amountOffered: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      interestRate: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
    })
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.banks = this.data.banks || [];
    console.log(this.data)
  }

  ngOnInit(): void {
    this.dialogRef
  }

  pushBank() {
    const bankDetails = this.banks.find(val => val.bank === this.addBank.value.bank);
    if(bankDetails) {
      bankDetails.amountOffered = this.addBank.value.amountOffered;
      bankDetails.interestRate = this.addBank.value.interestRate;
    } else {this.banks.push(this.addBank.value)}
    this.addBank.reset();
  }

  editBank(bankDetail) {
    this.addBank.patchValue({
      bank: bankDetail.bank,
      amountOffered: bankDetail.amountOffered,
      interestRate: bankDetail.interestRate
    })
  }

  deleteBank(index: number) {
    this.banks.splice(index, 1)
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  updateBankDetails() {
    // ['email', 'requestId', 'referenceId', 'referenceEmail']
    const payload = {
      email: this.data.email,
      requestId: this.data.requestId,
      referenceId: this.data.referenceId,
      referenceEmail: this.data.referenceEmail,
      banks: this.banks
    }
    this.loanService.updateBankDetails(payload).subscribe({
      next: (res: any) => {
        if(res.status) {
          this.dialogRef.close(true);
        } else {
          this.isUpdationFailed = true;
        }
      },
      error: (err) => {
        this.isUpdationFailed = true;
      }
    })
  }

}
