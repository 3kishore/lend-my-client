import { Injectable, TemplateRef } from '@angular/core';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { AccountService } from '../../../services/api/account.service';
import { catchError, map } from 'rxjs';

@Injectable()
export class ExecutiveSupportConfigService {

  constructor(
    private accService: AccountService
  ) { }

  initializeGidConfig(partnerNameTemplate: TemplateRef<any>, actionTemplate: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Partner Name',
          field: 'partnerName',
          hideFilter: false,
          isSortable: true,
          filterField: 'partnerName',
          filterType: EGridFilterType.STRING,
          cellTemplate: partnerNameTemplate
        },
        {
          label: 'Email',
          field: 'partnerEmailId',
          hideFilter: false,
          isSortable: true,
          filterField: 'partnerEmailId',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Ticket Title',
          field: 'regarding',
          hideFilter: false,
          isSortable: true,
          filterField: 'regarding',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Ticket Category',
          field: 'category',
          hideFilter: false,
          isSortable: true,
          filterField: 'category',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Ticket Status',
          field: 'issueStatus',
          hideFilter: false,
          isSortable: true,
          filterField: 'issueStatus',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Action',
          field: 'action',
          hideFilter: true,
          filterType: EGridFilterType.STRING,
          cellTemplate: actionTemplate
        },
      ],
      data: [],
      pageSizeOptionsConfig: {
        sizeOptions: [10, 20, 50]
      },
      pageSize: 10,
      total: 0,
      pageNumber: 1,
      isFiltered: false,
      uniqueFieldOfData: 'orderId',
      isSelectable: false,
      expandableRows: false
    }
    return gridConfig;
  }

  getMyPartnerTickets() {
    return this.accService.getPartnerSupportTickets().pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  updateMyIssueDetails(payload: any) {
    return this.accService.updateMyIssueDetails(payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
}
