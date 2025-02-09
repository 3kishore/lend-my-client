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

  initializeGidConfig(template: TemplateRef<any>, cusTemplate: TemplateRef<any>, orderCountTemplate: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Order ID',
          field: 'orderId',
          hideFilter: false,
          filterField: 'orderId',
          filterType: EGridFilterType.STRING,
          rowSpecifier: true,
          subRowField: 'orderId'
        },
        {
          label: 'Customer Name',
          field: 'customerName',
          hideFilter: false,
          isSortable: false,
          filterField: 'customerName',
          filterType: EGridFilterType.STRING,
          cellTemplate: cusTemplate,
          subRowField: 'customerName',
          subRowcellTemplate: cusTemplate
        },
        // {
        //   label: 'Subscription',
        //   field: 'subscription',
        //   hideFilter: false,
        //   isSortable: false,
        //   filterField: 'subscription',
        //   filterType: EGridFilterType.STRING,
        //   subRowField: 'subscription',
        // },
        {
          label: 'Order Status',
          field: 'orderStatus',
          hideFilter: false,
          isSortable: false,
          filterField: 'orderStatus',
          filterType: EGridFilterType.CHECKBOX,
          isContentBadge: true,
          checkboxFilterOptions: [
            {
              key: 'orderStatus',
              value: 'Accepted',
              checked: false,
              label: 'Accepted'
            },
            {
              key: 'orderStatus',
              value: 'Pending',
              checked: false,
              label: 'Pending'
            },
            {
              key: 'orderStatus',
              value: 'Rejected',
              checked: false,
              label: 'Rejected'
            },
            {
              key: 'orderStatus',
              value: 'Cessation',
              checked: false,
              label: 'Cessation'
            },
            {
              key: 'orderStatus',
              value: 'Reactivation',
              checked: false,
              label: 'Reactivation'
            },
            {
              key: 'orderStatus',
              value: 'Expired',
              checked: false,
              label: 'Expired'
            },
            {
              key: 'orderStatus',
              value: 'Terminated',
              checked: false,
              label: 'Terminated'
            },
            {
              key: 'orderStatus',
              value: 'Suspension',
              checked: false,
              label: 'Suspension'
            },
            {
              key: 'orderStatus',
              value: 'Cancellation',
              checked: false,
              label: 'Cancellation'
            }
          ]
        },
        {
          label: 'Order Count',
          field: 'orderCount',
          filterField: 'orderCount',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end',
          subRowField: 'orderCount',
          cellTemplate: orderCountTemplate,
          subRowcellTemplate: orderCountTemplate,
        },
        {
          label: 'Order Date',
          field: 'orderDate',
          hideFilter: true,
          isSortable: true,
          filterField: 'orderDate',
          filterType: EGridFilterType.STRING,
          subRowField: 'orderDate'
        },
        {
          label: 'Action',
          field: 'action',
          hideFilter: true,
          isSortable: false,
          filterField: 'action',
          cellTemplate: template,
          subRowField: 'action',
          subRowcellTemplate: template
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
      expandableRows: true
    }
    return gridConfig;
  }

  getLoanStatus(gridActionData: IServerSideGridRefreshEvent, overAllSearch: any, params: any) {
    let payload = this.commonHelperService.getGridPayload(gridActionData, overAllSearch, params);
    return this.loanStatus.getLoanStatus_2(payload).pipe(
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
