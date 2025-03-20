import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ExecutiveViewConfigService } from './executive-view-config.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { ModalComponent } from '../../oraganisms/modal/modal.component';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { AddBankComponent } from '../../oraganisms/add-banks/add-banks.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationModalComponent } from '../../oraganisms/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-executive-view',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule, ButtonComponent, MatMenuModule, MatDialogModule, FormsModule, ReactiveFormsModule, AddBankComponent],
  providers: [ExecutiveViewConfigService],
  templateUrl: './executive-view.component.html',
  styleUrl: './executive-view.component.scss'
})
export class ExecutiveViewComponent {
  orderList: any;

  totalCount: number = 0;

  gridConfig!: IServerSideGrid;

  @ViewChild('actionTemplate', { static: true })
  public actionTemplate: TemplateRef<any>;

  // @ViewChild('updateBankDetailsTemplate', { static: true })
  // public updateBankDetailsTemplate: TemplateRef<any>;

  @ViewChild('requestIdTemplate', { static: true })
  public requestIdTemplate: TemplateRef<any>;

  matDialogRef: MatDialogRef<ModalComponent>;

  manageConfig: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'manage',
    label: 'Manage',
    isDisabled: false,
    isActive: true,
    rightIconPath: '../../../../assets/icons/arrow-down-fill.svg'
  };

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean;

  loanRejectionReason = '';

  actionList = [
    'Application Viewed',
    'Executive Assigned',
    'Contacted Client',
    'Details Collected',
    'Cibil Checked',
    'Rejected',
    'Completed'
  ]

  finalAmount = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{5,10}$/)
  ]);

  sessionObj;

  @ViewChild('alertPopupContentTemplate', {static: true})
    alertPopupContentTemplate: TemplateRef<any>

  @ViewChild('loanRejectionContentTemplate', { static: true })
    public loanRejectionContentTemplate: TemplateRef<any>;

  @ViewChild('alertSuccessContentTemplate', { static: true })
    public alertSuccessContentTemplate: TemplateRef<any>

  @ViewChild('alertSuccessActionTemplate', { static: true })
    public alertSuccessActionTemplate: TemplateRef<any>

  constructor(
    private router: Router,
    private configService: ExecutiveViewConfigService,
    private matDialog: MatDialog,
    private dataService: AppDataService,
        private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.gridConfig = this.configService.initializeGidConfig(this.requestIdTemplate, this.actionTemplate);
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
    this.getAllLoanRequests();
  }

  getAllLoanRequests() {
    this.gridLoading = true
    this.component$.add(
      this.configService.getAllLoanRequests(this.gridActionData, {}, {}).subscribe({
        next: (resp: any) =>  {
          this.gridConfig.data = resp.content;
          this.gridConfig.total = resp.totalElement;
          setTimeout(() => {
            this.gridLoading = false;
          }, 100);
        },
        error: (err) =>  {
          this.gridLoading = false
          console.log(err);
        },
      })
    )
  }

  updateLoanStatus(status: string, loanDetails) {
    this.gridLoading = true
    const payload = {
      email: loanDetails.email,
      requestId: loanDetails.requestId,
      referenceId: loanDetails.referenceId,
      referenceEmail: loanDetails.referenceEmail,
      loanStatus: status,
      executiveId: this.sessionObj.userDetail.userId,
      executiveEmail: this.sessionObj.userDetail.email,
      reasonForRejection: this.loanRejectionReason,
      finalAmount: this.finalAmount.value
    }
    this.component$.add(
      this.configService.updateLoanStatus(payload).subscribe({
        next: (resp: any) =>  {
          setTimeout(() => {
            this.gridLoading = false;
          }, 100);
          this.getAllLoanRequests()
        },
        error: (err) =>  {
          this.gridLoading = false
          console.log(err);
        },
      })
    )
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    this.getAllLoanRequests();
  }

  readonly dialog = inject(MatDialog);

  openActionPopup(status: string, loanDetails) {
    this.finalAmount.reset();
    this.loanRejectionReason = '';
    status.toLocaleLowerCase() === 'rejected' ? this.openRejectionStatusPopup({ status, loanDetails })
      : status.toLocaleLowerCase() === 'completed' ? this.openCompletedStatusPopup({ status, loanDetails }) : this.openStateChangePopup({ status, loanDetails });
  }
  
  openStateChangePopup(data) {
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
          this.updateLoanStatus(data.status, data.loanDetails);
        }
      }
    })
  }

  openRejectionStatusPopup(data) {
    const dialogRef = this.dialog.open(
      ConfirmationModalComponent,
      {
        // hasBackdrop: true,
        data: {
          contentTemplate: this.loanRejectionContentTemplate,
          data: data
        }
      }
    );
    dialogRef.afterClosed().subscribe({
      next: (resp) => {
        console.log('resp', resp)
        if(resp) {
          this.updateLoanStatus(data.status, data.loanDetails);
        }
      }
    })
  }

  openCompletedStatusPopup(data) {
    this.dialog.open(
      ConfirmationModalComponent,
      {
        // hasBackdrop: true,
        data: {
          contentTemplate: this.alertSuccessContentTemplate,
          actionTemplate: this.alertSuccessActionTemplate,
          data: data
        }
      }
    );
    // dialogRef.afterClosed().subscribe({
    //   next: (resp) => {
    //     console.log('resp', resp)
    //     if(resp) {
    //       this.updateLoanStatus(data.status, data.loanDetails);
    //     }
    //   }
    // })
  }

  acceptCompletedLoan(data) {
    this.dialog.closeAll();
    this.updateLoanStatus(data.status, data.loanDetails);
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

}
