import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApplicationStatusConfigService } from './application-status-config.service';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { Subscription } from 'rxjs';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { ModalComponent } from '../../oraganisms/modal/modal.component';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-application-status',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule, ButtonComponent, MatMenuModule, MatDialogModule],
  providers: [ApplicationStatusConfigService],
  templateUrl: './application-status.component.html',
  styleUrl: './application-status.component.scss'
})
export class ApplicationStatusComponent {
  orderList: any;

  orderStatus: any;

  totalCount: number = 0;

  gridConfig!: IServerSideGrid;

  @ViewChild('customerNameTemplate', { static: true })
  public customerNameTemplate: TemplateRef<any>;

  @ViewChild('popupApproveTemplate', { static: true })
  public popupApproveTemplate: TemplateRef<any>;

  @ViewChild('popupRejectTemplate', { static: true })
  public popupRejectTemplate: TemplateRef<any>;

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

  sessionObj;

  constructor(
    private router: Router,
    private configService: ApplicationStatusConfigService,
    private matDialog: MatDialog,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {}

  ngOnInit(): void {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    console.log(this.sessionObj)
    this.gridConfig = this.configService.initializeGidConfig(this.customerNameTemplate);
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
    this.getLoanStatus();
  }

  getLoanStatus() {
    this.gridLoading = true
    const payload = {
      referenceId: this.sessionObj.userDetail.userId,
      referenceEmail: this.sessionObj.userDetail.email
    }
    this.component$.add(
      this.configService.getLoanStatus(this.gridActionData, {}, {}, payload).subscribe({
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

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    this.getLoanStatus();
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

  openModal(orderId: any, isApprove?: boolean) {
    const poupData = {
      buttonList: [],
      data: orderId,
      restrictOutSieClick: true,
      showCloseBtn: true,
      closeBtnLabel: 'Cancel',
      title: `<img src="../../../../assets/icons/${isApprove? 'success.svg' : 'failed.svg'}">
      <span>${isApprove? 'Approve' : 'Reject'}</span>`,
      exportForm: false,
      templateRef: isApprove? this.popupApproveTemplate : this.popupRejectTemplate
    } 
    this.matDialogRef = this.matDialog.open(ModalComponent, {
      data: poupData,
      maxWidth: 732,
      height: '338px',
      position: {
        top: '64px'
      }
    });
    this.matDialogRef.afterClosed().subscribe({
      next: (resp: any) => {
        if(resp) {
          this.dataService.updateAppLoader(true);
          let param = {
            subscriptionId: orderId,
            action: isApprove? 'accepted' : 'rejected'
          }
          this.configService.changeApplicationStatus(param).subscribe({
            next: (resp) => {
              setTimeout(() => {
                this.dataService.updateAppLoader(false);
                this.getLoanStatus();
              }, 100);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    })
  }
}
