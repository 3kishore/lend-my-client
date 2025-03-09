import { Injectable, TemplateRef } from '@angular/core';
import { AccountService } from '../../../services/api/account.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { catchError, map } from 'rxjs';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { APP } from '../../../utils/constants/APP.const';

@Injectable()
export class OrderDetailConfigService {

  constructor(
    private accountService: AccountService,
    private commonHelperService: CommonHelperService,
    private loanService: LoanApplicationsService,
  ) {}
  
  initializeGidConfig(bankerNameTemplate: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Bank',
          field: 'bankName',
          hideFilter: false,
          filterField: 'bankName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Banker Name',
          field: 'bankerName',
          hideFilter: false,
          filterField: 'bank',
          filterType: EGridFilterType.STRING,
          cellTemplate: bankerNameTemplate
        },
        {
          label: 'Maximun Loan Amount',
          field: 'maxLoanAmount',
          hideFilter: false,
          isSortable: false,
          filterField: 'maxLoanAmount',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Interest Rate',
          field: 'rateOfInterest',
          hideFilter: false,
          isSortable: false,
          filterField: 'rateOfInterest',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Maximum Loan Tenure',
          field: 'maxLoanTenure',
          hideFilter: false,
          isSortable: false,
          filterField: 'maxLoanTenure',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'EMI Per Month',
          field: 'emiPerMonth',
          hideFilter: false,
          isSortable: false,
          filterField: 'emiPerMonth',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Max FOIR',
          field: 'maxFoir',
          hideFilter: false,
          isSortable: false,
          filterField: 'maxFoir',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Processing FEE',
          field: 'processingFee',
          hideFilter: false,
          isSortable: false,
          filterField: 'processingFee',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Other Charges',
          field: 'otherCharges',
          hideFilter: false,
          isSortable: false,
          filterField: 'otherCharges',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end'
        },
        {
          label: 'Advantages',
          field: 'advantage',
          hideFilter: false,
          isSortable: false,
          filterField: 'advantage',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Status',
          field: 'loanStatus',
          hideFilter: false,
          filterField: 'loanStatus',
          filterType: EGridFilterType.STRING
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
      isSelectable: false
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

  getOrderDetails(data: any) {
    return this.accountService.getOrderDetails(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  assignBanker(data: any) {
    return this.accountService.assignBanker(data).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getAssignedBanker(data: any) {
    return this.accountService.getAssignedBankers(data).pipe(
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
