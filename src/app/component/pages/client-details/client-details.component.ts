import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  assignUser: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'assign-banker',
    label: 'Assign Banker',
    isDisabled: false,
    isActive: true
  }

  rejectBtnConfig: IButton = {
    id: 'reject',
    label: 'Reject',
    type: EButtonType.PRIMARY,
    customclass: 'danger h-[28px] py-[0] px-[8px]'
  }

  acceptBtnConfig: IButton = {
    id: 'accept',
    label: 'Accept',
    type: EButtonType.PRIMARY,
    customclass: 'success h-[28px] py-[0] px-[8px]'
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

  readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  @ViewChild('actionOnProposalTemplate', { static: true })
    public actionOnProposalTemplate: TemplateRef<any>;

  sessionObj;

  constructor(
    private router: Router,
    private configService: ClientDetailsConfigService,
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
        console.log(this.queryParams)
      }
    })
    this.gridConfig = this.configService.initializeGidConfig(this.actionOnProposalTemplate);
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
      requestId: this.queryParams.clientId
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
      loanId: this.queryParams.clientId
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

  recjectProposal(data) {
    console.log(data)
    const payload = {
      loanId: data.loanId,
      bankerId: data.bankerId,
      reasonForRejection: 'Rejected by the client.'
    }
    console.log(payload)
    this.component$.add(
      this.configService.rejectBankerProposal(payload).subscribe({
        next: (resp) => {
          if(resp.status) {
            this.getAssignedBanker();
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  acceptBankerProposal(data) {
    console.log(data)
    const payload = {
      loanId: data.loanId,
      bankerId: data.bankerId
    }
    console.log(payload)
    this.component$.add(
      this.configService.acceptBankerProposal(payload).subscribe({
        next: (resp) => {
          if(resp.status) {
            this.getAssignedBanker();
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }
}
