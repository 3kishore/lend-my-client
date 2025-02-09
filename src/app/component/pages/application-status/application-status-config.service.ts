import { Injectable, TemplateRef } from '@angular/core';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { catchError, map } from 'rxjs';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { APP } from '../../../utils/constants/APP.const';

@Injectable()
export class ApplicationStatusConfigService {

  
  constructor(
    private loanStatus: LoanApplicationsService,
    private commonHelperService: CommonHelperService
  ) {}

  initializeGidConfig(cusTemplate: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Request ID',
          field: 'requestId',
          hideFilter: false,
          filterField: 'requestId',
          filterType: EGridFilterType.STRING,
          rowSpecifier: true,
          subRowField: 'requestId'
        },
        {
          label: 'Client Name',
          field: 'clientName',
          hideFilter: false,
          isSortable: false,
          filterField: 'clientName',
          filterType: EGridFilterType.STRING,
          cellTemplate: cusTemplate,
          subRowField: 'clientName',
          subRowcellTemplate: cusTemplate
        },
        {
          label: 'Requested Amount',
          field: 'loanAmount',
          filterField: 'loanAmount',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end',
          subRowField: 'loanAmount'
        },
        {
          label: 'Loan Type',
          field: 'loanType',
          hideFilter: true,
          isSortable: true,
          filterField: 'loanType',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Request Date',
          field: 'requestTime',
          hideFilter: true,
          isSortable: true,
          filterField: 'requestTime',
          filterType: EGridFilterType.STRING,
          subRowField: 'requestTime'
        },
        {
          label: 'Loan Status',
          field: 'loanStatus',
          hideFilter: false,
          isSortable: false,
          filterField: 'loanStatus',
          filterType: EGridFilterType.CHECKBOX,
          // isContentBadge: true,
          checkboxFilterOptions: [
            {
              key: 'loanStatus',
              value: 'Accepted',
              checked: false,
              label: 'Accepted'
            },
            {
              key: 'loanStatus',
              value: 'Pending',
              checked: false,
              label: 'Pending'
            },
            {
              key: 'loanStatus',
              value: 'Rejected',
              checked: false,
              label: 'Rejected'
            },
            {
              key: 'loanStatus',
              value: 'Cessation',
              checked: false,
              label: 'Cessation'
            },
            {
              key: 'loanStatus',
              value: 'Reactivation',
              checked: false,
              label: 'Reactivation'
            },
            {
              key: 'loanStatus',
              value: 'Expired',
              checked: false,
              label: 'Expired'
            },
            {
              key: 'loanStatus',
              value: 'Terminated',
              checked: false,
              label: 'Terminated'
            },
            {
              key: 'loanStatus',
              value: 'Suspension',
              checked: false,
              label: 'Suspension'
            },
            {
              key: 'loanStatus',
              value: 'Cancellation',
              checked: false,
              label: 'Cancellation'
            }
          ]
        }
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

  getLoanStatus(gridActionData: IServerSideGridRefreshEvent, overAllSearch: any, params: any, tempPayload) {
    let _ = this.commonHelperService.getGridPayload(gridActionData, overAllSearch, params);
    return this.loanStatus.getLoanStatus(tempPayload).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }

  changeApplicationStatus(data: any) {
    return this.loanStatus.changeApplicationStatus(data).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }
}
