import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { ModalComponent } from '../../oraganisms/modal/modal.component';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MatMenuModule } from '@angular/material/menu';
import { OrderDetailConfigService } from './order-detail-config.service';
import { AssignBankerModalComponent } from '../../oraganisms/assign-banker-modal/assign-banker-modal.component';
import { AppDataService } from '../../../utils/storage/app-data.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent, MatMenuModule, MatDialogModule, RouterModule, AssignBankerModalComponent],
  providers: [OrderDetailConfigService],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {

  gridConfig: IServerSideGrid;

  assignUser: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'assign-banker',
    label: 'Assign Banker',
    isDisabled: false,
    isActive: true
  }

  matDialogRef: MatDialogRef<ModalComponent>;

  component$ = new Subscription();

  customerDetails: any;

  gridLoading: boolean = true;

  gridActionData: IServerSideGridRefreshEvent;

  customerDetailsLoader = true;

  queryParams;

  levelOne = [
    {
      label: "Application Viewed",
      isCompleted: false,
      tooltip: 'Done'
    },
    {
      label: "Executive Assigned",
      isCompleted: false,
      tooltip: 'Pending'
    },
    {
      label: "Contacted Client",
      isCompleted: false,
      tooltip: 'Pending'
    },
    {
      label: "Details Collected",
      isCompleted: false,
      tooltip: 'Pending'
    },
    {
      label: "Cibil Checked",
      isCompleted: false,
      tooltip: 'Pending'
    }
  ]

  // levelTwo = [
  //   {
  //     label: "Cibil Checked",
  //     isCompleted: false
  //   },
  //   {
  //     label: "Contacted Bank",
  //     isCompleted: false
  //   },
  //   {
  //     label: "Loan Sanctioned",
  //     isCompleted: false
  //   },
  //   {
  //     label: "Amount Deposited",
  //     isCompleted: false
  //   }
  // ]

  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  @ViewChild('bankerNameTemplate', { static: true })
    public bankerNameTemplate: TemplateRef<any>;

  sessionObj;

  constructor(
    private router: Router,
    private configService: OrderDetailConfigService,
    private routSnap: ActivatedRoute,
    private commonService: CommonHelperService,
    private dataService: AppDataService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.routSnap.params.subscribe({
      next: (resp) => {
        this.queryParams = resp;
      }
    })
    this.gridConfig = this.configService.initializeGidConfig(this.bankerNameTemplate);
    this.gridActionData = {
      filters: [],
      sort: {
        sortKey: '',
        sortType: ''
      },
      pageSize: this.gridConfig.pageSize,
      pageNo: this.gridConfig.pageNumber
    }
    this.gridConfig.selectedPageSize = 10;
    this.getOrderDetails();
    this.getAssignedBanker();
    // this.getBankDetail();
  }

  getOrderDetails() {
    this.customerDetailsLoader = true;
    const payload = {
      requestId: this.queryParams.requestId
    }
    this.component$.add(
      this.configService.getOrderDetails(payload).subscribe({
        next: (resp) => {
          this.customerDetailsLoader = false;
          if(resp.status) {
            this.customerDetails = resp.content;
            const loanStatus = resp.content.loanStatus?.toLowerCase();
            const levelOneIndex = this.levelOne.findIndex(x => x.label.toLowerCase() === loanStatus);
            // const levelTwoIndex = this.levelTwo.findIndex(x => x.label.toLowerCase() === loanStatus);
            if(levelOneIndex >= 0) {
              this.levelOne.forEach((val, i) => i <= levelOneIndex ? val.isCompleted = true : '');
            }
          }
        },
        error: (err) => {
          console.log(err);
          this.customerDetailsLoader = false;
        }
      })
    )
  }

  getAssignedBanker() {
    this.gridLoading = true;
    const payload = {
      loanId: this.queryParams.requestId
    }
    this.component$.add(
      this.configService.getAssignedBanker(payload).subscribe({
        next: (resp) => {
          this.gridLoading = false;
          if(resp.status) {
            this.gridConfig.data = resp.content || [];
            this.gridConfig.total = resp.totalElements || 0;
          }
        },
        error: (err) => {
          console.log(err);
          this.gridLoading = false;
        }
      })
    )
  }

  assignBankExecutive() {
    const dailogRef = this.dialog.open(AssignBankerModalComponent, {hasBackdrop: false})
    dailogRef.afterClosed().subscribe({
      next: (resp) => {
        if(resp) {
          this.dataService.updateAppLoader(true);
          console.log(resp)
          const date = new Date();
          const payload = {
            loanId: this.customerDetails.requestId,
            bankerId: resp.bankerId,
            bankerName: resp.bankerName,
            bankName: resp.bank,
            clientName: `${this.customerDetails.firstName} ${this.customerDetails.lastName}`,
            requestedLoanAmount: this.customerDetails.loanAmount,
            loanType: this.customerDetails.loanType,
            mobileNumber:  this.customerDetails.mobileNumber,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          }
          this.component$.add(
            this.configService.assignBanker(payload).subscribe({
              next: (resp) => {
                this.dataService.updateAppLoader(false);
                if(resp.status) {
                  this._snackBar.open('Assignment Successfull', '', {panelClass: ['success-snackbar'], duration: 6000});
                  this.getAssignedBanker();
                } else {
                  this._snackBar.open('Assignment Failed', '', {panelClass: ['danger-snackbar'], duration: 6000})
                }
              }, error: (err) => {
                this.dataService.updateAppLoader(false);
                this._snackBar.open('Assignment Failed', '', {panelClass: ['danger-snackbar'], duration: 6000})
              }
            })
          )
        }
      }
    })
  }

  refresh() {
    this.getOrderDetails();
    this.getAssignedBanker();
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    // this.getBankDetail();
  }

  getColor(type: string) {
    const value: any = type.toLocaleLowerCase();
    if (value === 'approved') {
      return '#60a69f';
    } else if (value == 'rejected') {
      return '#77b5d9';
    } else {
      return '#6682ba';
    }
  }

  back() {
    this.router.navigate([APP.ROUTES.ORDER]);
  }
}
