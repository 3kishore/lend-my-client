import { Injectable, TemplateRef } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AccountService } from '../../../services/api/account.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';

@Injectable()
export class ClientDetailsConfigService {

  constructor(
    private accountService: AccountService,
    private commonHelperService: CommonHelperService,
    private loanService: LoanApplicationsService
  ) {}

  initializeGidConfig() {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Bank',
          field: 'bank',
          hideFilter: false,
          filterField: 'bank',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Amount Offered',
          field: 'amountOffered',
          hideFilter: false,
          isSortable: false,
          filterField: 'amountOffered',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Interest Rate',
          field: 'interestRate',
          hideFilter: false,
          isSortable: false,
          filterField: 'interestRate',
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
      // uniqueFieldOfData: 'orderId',
      isSelectable: false,
      // expandableRows: true
    }
    return gridConfig;
  }

  initializeChart() {
    let chartConfig = {
      chartRootId: 'app-registration-alerts',
      title: '',
      isLoading: false,
      customClass: '',
      showLegend: true,
      doughnutRadius: 50,
      centerLabelText: 'Orders',
      data: []
    }
    return chartConfig;
  }

  getCustomerDetails(data: any) {
    return this.accountService.getCustomerDetails(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankDetail(gridActionData: IServerSideGridRefreshEvent, overAllSearch: any, params: any) {
    let payload = this.commonHelperService.getGridPayload(gridActionData, overAllSearch, params);
    return this.loanService.getBankDetail(payload).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }

  changeApplicationStatus(data: any) {
    return this.loanService.changeApplicationStatus(data).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }
}
