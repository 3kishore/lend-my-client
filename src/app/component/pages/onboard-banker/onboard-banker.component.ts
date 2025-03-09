import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../../services/api/account.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-onboard-banker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './onboard-banker.component.html',
  styleUrl: './onboard-banker.component.scss'
})
export class OnboardBankerComponent {

  readonly dialogRef = inject(MatDialogRef<OnboardBankerComponent>);
    
    createBanker: FormGroup;
  
    isCreationFailed = false;
  
    isUserCreated = false;
  
    errorMessage = '';
  
    sessionObj;
  
    bankerId = '';

    banksList = []
  
    bankerType = [
      'Zonal Head',
      'Regional Head',
      'Area Head'
    ]

    zoneList = [
      {
        id: 'chennai-north',
        label: 'Chennai North'
      },
      {
        id: 'chennai-south',
        label: 'Chennai South'
      },
      {
        id: 'chennai-central',
        label: 'Chennai Central'
      },
      {
        id: 'chengalpattu',
        label: 'Chengalpattu'
      },
      {
        id: 'kanchipuram',
        label: 'Kanchipuram'
      },
      {
        id: 'thiruvallur',
        label: 'Thiruvallur'
      }
    ]

    conmponent$ = new Subscription();
  
    constructor(
      private fb: FormBuilder,
      private accService: AccountService,
      private dataService: AppDataService,
      private commonService: CommonHelperService
    ) {
      this.dataService.updateAppLoader(true);
      this.createBanker = this.fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: [''],
        phoneNo: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],
        email: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])],
        bankName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        branch: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        employeeId: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        zone: ['', Validators.compose([Validators.required])],
        designation: ['', Validators.compose([Validators.required])],
        officialEmail: ['', Validators.compose([Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)])]
      })
      this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);

      this.createBanker.valueChanges.subscribe({
        next: (resp) => {
          console.log(resp, this.createBanker.valid, this.createBanker.value)
        }
      })
      this.getBankingPartners();
    }
  
    onCancel(): void {
      this.dialogRef.close();
    }

    getBankingPartners() {
      this.conmponent$.add(
        this.accService.getBankingPartners().subscribe({
          next: (resp) => {
            this.dataService.updateAppLoader(false);
            if(resp.status) {
              this.banksList = resp.content;
            }
          }, error: (err) => {
            this.dataService.updateAppLoader(false);
          }
        })
      )
    }
  
    onCreateBanker() {
      this.dataService.updateAppLoader(true);
      const payload = {
        ...this.createBanker.value,
        referenceId: this.sessionObj.userDetail.userId,
        referenceEmail: this.sessionObj.userDetail.email,
        refererName: `${this.sessionObj.userDetail.firstName} ${this.sessionObj.userDetail.lastName}`
      }
      this.accService.createBanker(payload).subscribe({
        next: (resp) => {
          this.dataService.updateAppLoader(false);
          if(resp.status) {
            this.isUserCreated = true;
            this.bankerId = resp.content.bankerId;
          } else {
            this.isCreationFailed = true;
            this.errorMessage = resp.message ? resp.message : 'Something went wrong please try again time later.';
          }
        }, error: (err) => {
          this.dataService.updateAppLoader(false);
          this.isCreationFailed = true;
          this.errorMessage = 'Something went wrong please try again time later.';
        }
      })
    }
}
