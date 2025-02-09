import { Injectable, TemplateRef } from '@angular/core';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { catchError, map } from 'rxjs';

@Injectable()
export class MyCommissionsConfigService {

  constructor(
    private loanStatus: LoanApplicationsService,
    private commonHelperService: CommonHelperService
  ) {}

  initializeGidConfig() {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Payment ID',
          field: 'paymentId',
          hideFilter: false,
          filterField: 'paymentId',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Date Of Payment',
          field: 'dateOfPayment',
          hideFilter: false,
          filterField: 'dateOfPayment',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Gross Commission',
          field: 'grossCommission',
          filterField: 'grossCommission',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'TDS',
          field: 'tds',
          filterField: 'tds',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Net Commission',
          field: 'netPay',
          filterField: 'netPay',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
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
  
  getMyCommissionsList(gridActionData: IServerSideGridRefreshEvent, overAllSearch: any, params: any, tempPayload) {
    let _ = this.commonHelperService.getGridPayload(gridActionData, overAllSearch, params);
    return this.loanStatus.getMyCommissionsList(tempPayload).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }
}
