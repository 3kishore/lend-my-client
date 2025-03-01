import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { Router } from '@angular/router';
import { ApplicationStatusConfigService } from '../application-status/application-status-config.service';
import { ExecutiveSupportConfigService } from './executive-support-config.service';
import { MatMenuModule } from '@angular/material/menu';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-executive-support',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, MatMenuModule, ButtonComponent],
  providers: [ExecutiveSupportConfigService],
  templateUrl: './executive-support.component.html',
  styleUrl: './executive-support.component.scss'
})
export class ExecutiveSupportComponent implements OnInit {

  gridConfig!: IServerSideGrid;

  gridLoading = true;

  gridActionData: IServerSideGridRefreshEvent;

  actionList = [
    'Contacted',
    'Inprogress',
    'Resolved'
  ]

  manageConfig: IButton = {
      type: EButtonType.PRIMARY,
      customclass: 'primary stroke',
      id: 'manage',
      label: 'Manage',
      isDisabled: false,
      isActive: true,
      rightIconPath: '../../../../assets/icons/arrow-down-fill.svg'
    };

  @ViewChild('partnerNameTemplate', { static: true })
    public partnerNameTemplate: TemplateRef<any>;
  
  @ViewChild('ticketActionTemplate', { static: true })
    public ticketActionTemplate: TemplateRef<any>;

  sessionObj;

  constructor(
    private router: Router,
    private configService: ExecutiveSupportConfigService,
    private commonService: CommonHelperService
  ) { }

  ngOnInit(): void {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.gridConfig = this.configService.initializeGidConfig(this.partnerNameTemplate, this.ticketActionTemplate);
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
    this.getMyPartnerTickets();
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    // this.getLoanStatus();
  }

  getMyPartnerTickets() {
    this.gridLoading = true;
    this.configService.getMyPartnerTickets().subscribe({
      next: (resp) => {
        this.gridLoading = false;
        if(resp.status) {
          this.gridConfig.data = resp.content;
          this.gridConfig.total = resp.content.length;
        }
      }, error: (err) => {
        this.gridLoading = false;
      }
    })
  }

  updateIssueStatus(data: any, status: string) {
    const payload = {
      partnerId: data.partnerId,
      issueId: data.issueId,
      issueStatus: status,
      executiveName: `${this.sessionObj.userDetail.firstName} ${this.sessionObj.userDetail.lastName}`,
      executiveUserId: this.sessionObj.userDetail.userId,
    }
//     {
//       "issueId": "ce6131eb-3e23-54ca-802c-8e3db5e367cf",
//       "partnerId": "1ce7fa8b-d555-467a-9979-9323ef7c6d56",
//       "issueStatus": "resolve",
//       "executiveName": "kishore",
//       "executiveUserId": "e1a06736-2bd9-4f72-ae46-3a1ca1381a5e"
// }

    this.configService.updateMyIssueDetails(payload).subscribe({
      next: (resp) => {
        if(resp.status) {
          this.getMyPartnerTickets();
        }
      }
    })
  }

  viewIssueDetails(data: any) {
    this.router.navigate([`${APP.ROUTES.VIEW_TICKET_DETAILS}/${data.partnerId}/${data.issueId}`])
  }

}
