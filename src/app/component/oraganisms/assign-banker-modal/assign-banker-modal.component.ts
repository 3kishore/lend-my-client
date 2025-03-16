import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../services/api/account.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';

@Component({
  selector: 'app-assign-banker-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './assign-banker-modal.component.html',
  styleUrl: './assign-banker-modal.component.scss'
})
export class AssignBankerModalComponent {

  readonly dialogRef = inject(MatDialogRef<AssignBankerModalComponent>);
  
  assignBanker: FormGroup;

  isAssignationFailed = false;

  isAssignmentSuccess = false;

  errorMessage = '';

  sessionObj;

  userId = '';

  banksList = []

  zoneList = []

  bankersList = []

  constructor(
    private fb: FormBuilder,
    private accService: AccountService,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {
    this.assignBanker = this.fb.group({
      bank: ['', Validators.compose([Validators.required])],
      zone: ['', Validators.compose([Validators.required])],
      bankerId: ['', Validators.compose([Validators.required])],
      documentLink: ['', Validators.compose([Validators.required, Validators.minLength(10)])]
    })
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.getBankingPartnersAndPartners();
  }

  getBankingPartnersAndPartners() {
    this.accService.getBankingPartnersAndPartners().subscribe({
      next: (resp) => {
        if(resp.status) {
          this.banksList = resp.content;
        } else {
          this.errorMessage = resp.message ? resp.message : 'Something went wrong please try again time later.';
        }
        this.dataService.updateAppLoader(false);
      }, error: (err) => {
        this.errorMessage = 'Something went wrong please try again time later.';
        this.dataService.updateAppLoader(false);
      }
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onBankChange($event) {
    this.assignBanker.get('zone').reset();
    this.assignBanker.get('bankerId').reset();
    this.zoneList = this.banksList.find(val => val.bankName === $event.target.value)?.bankers || [];
    this.bankersList = [];
  }

  onZoneChange($event) {
    this.assignBanker.get('bankerId').reset();
    this.bankersList = this.zoneList.find(val => val.zone === $event.target.value)?.bankers || [];
  }

  assignUser() {
    const banker = this.bankersList.find(val => val.bankerId === this.assignBanker.value.bankerId)
    this.dialogRef.close({...this.assignBanker.value, bankerName: `${banker.firstName} ${banker.lastName}`});
  }
}
