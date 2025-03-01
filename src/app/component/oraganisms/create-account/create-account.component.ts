import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../services/api/account.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  readonly dialogRef = inject(MatDialogRef<CreateAccountComponent>);
  
  createUser: FormGroup;

  isCreationFailed = false;

  isUserCreated = false;

  errorMessage = '';

  sessionObj;

  userId = '';

  partnerTypeList = [
    'Auditor',
    'Tax Consultant',
    'Engineer',
    'Builder',
    'Land Promoter',
    'Real Estate Broker',
    'Others'
  ]

  constructor(
    private fb: FormBuilder,
    private accService: AccountService,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {
    this.createUser = this.fb.group({
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [''],
      phoneNo: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])],
      partnerType: ['', Validators.compose([Validators.required])],
      companyName: ['', Validators.compose([Validators.required])]
    })
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateUser() {
    this.dataService.updateAppLoader(true);
    const payload = {
      ...this.createUser.value,
      referenceId: this.sessionObj.userDetail.userId,
      referenceEmail: this.sessionObj.userDetail.email,
      refererName: `${this.sessionObj.userDetail.firstName} ${this.sessionObj.userDetail.lastName}`
    }
    this.accService.createUser(payload).subscribe({
      next: (resp) => {
        if(resp.status) {
          this.isUserCreated = true;
          this.userId = resp.content.userId;
        } else {
          this.isCreationFailed = true;
          this.errorMessage = resp.message ? resp.message : 'Something went wrong please try again time later.';
        }
        this.dataService.updateAppLoader(false);
      }, error: (err) => {
        this.isCreationFailed = true;
        this.errorMessage = 'Something went wrong please try again time later.';
        this.dataService.updateAppLoader(false);
      }
    })
  }
}
