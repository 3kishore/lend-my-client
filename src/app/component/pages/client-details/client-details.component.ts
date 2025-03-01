import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { ModalComponent } from '../../oraganisms/modal/modal.component';
import { Subscription } from 'rxjs';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDetailsConfigService } from './client-details-config.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent, MatMenuModule, MatDialogModule],
  providers: [ClientDetailsConfigService],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {

  gridConfig: IServerSideGrid;

  manageConfig: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'manage',
    label: 'Manage',
    isDisabled: false,
    isActive: true,
    rightIconPath: '../../../../assets/icons/arrow-down-fill.svg'
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
    }
  ]

  levelTwo = [
    {
      label: "Cibil Checked",
      isCompleted: false
    },
    {
      label: "Contacted Bank",
      isCompleted: false
    },
    {
      label: "Loan Sanctioned",
      isCompleted: false
    },
    {
      label: "Amount Deposited",
      isCompleted: false
    }
  ]

  sessionObj;

  constructor(
    private router: Router,
    private configService: ClientDetailsConfigService,
    private routSnap: ActivatedRoute,
    private matDialog: MatDialog,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.routSnap.params.subscribe(x => {
      this.queryParams = x;
    })
    this.setPage();
    this.gridConfig = this.configService.initializeGidConfig();
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
    // this.getBankDetail();
  }

  setPage() {
    this.gridLoading = true;
    this.customerDetailsLoader = true;
    // ['email', 'requestId', 'referenceId', 'referenceEmail']
    const payload = {
      requestId: this.queryParams.clientId,
      email: this.queryParams.email,
      referenceId: this.sessionObj.userDetail.userId,
      referenceEmail: this.sessionObj.userDetail.email
    }
    this.component$.add(
      this.configService.getCustomerDetails(payload).subscribe({
        next: (resp) => {
          this.customerDetails = resp.content;
          // let loanStatus
          const loanStatus = resp.content.loanStatus?.toLowerCase();
          const levelOneIndex = this.levelOne.findIndex(x => x.label.toLowerCase() === loanStatus);
          const levelTwoIndex = this.levelTwo.findIndex(x => x.label.toLowerCase() === loanStatus);
          if(levelOneIndex < 0 && levelTwoIndex >= 0) {
            this.levelOne.forEach(val => val.isCompleted = true);
            this.levelTwo.forEach((val, i) => i <= levelTwoIndex ? val.isCompleted = true : '');
          } else if(levelOneIndex >= 0 && levelTwoIndex < 0) {
            this.levelOne.forEach((val, i) => i <= levelOneIndex ? val.isCompleted = true : '');
          }
          console.log(resp.content?.banks)
          this.gridConfig.data = resp.content?.banks || [];
          this.gridConfig.total = resp.content?.banks?.length || 0;
          setTimeout(() => {
            this.customerDetailsLoader = false;
            this.gridLoading = false;
          }, 100);
        },
        error: (err) => {
          console.log(err);
          setTimeout(() => {
            this.customerDetailsLoader = false;
            this.gridLoading = false;
          }, 100);
        }
      })
    )
  }

  refresh() {
    this.setPage();
    // this.getBankDetail();
  }

  // getBankDetail() {
  //   this.gridLoading = true
  //   this.component$.add(
  //     this.configService.getBankDetail(this.gridActionData, '', '').subscribe({
  //       next: (resp: any) =>  {
  //         this.gridConfig.data = resp.content;
  //         this.gridConfig.total = resp.totalElement;
  //         this.gridLoading = false;
  //       },
  //       error: (err) =>  {
  //         this.gridLoading = false
  //         console.log(err);
  //       },
  //     })
  //   )
  // }

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
    this.router.navigate([APP.ROUTES.LOAN_APPLICATION_STATUS]);
  }
}
