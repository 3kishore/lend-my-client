import { Injectable } from '@angular/core';
import { AccountService } from '../../../services/api/account.service';
import { catchError, map } from 'rxjs';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { APP } from '../../../utils/constants/APP.const';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';

@Injectable()
export class BankersDetailConfigService {

  constructor(
    private accService: AccountService,
    private applicationService: LoanApplicationsService
  ) { }

  initializeGidConfig_() {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Customer Name',
          field: 'customerName',
          hideFilter: false,
          isSortable: false,
          filterField: 'customerName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Loan Amount',
          field: 'loanAmount',
          hideFilter: false,
          isSortable: false,
          filterField: 'loanAmount',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Offered Amount',
          field: 'offeredAmount',
          hideFilter: false,
          isSortable: false,
          filterField: 'offeredAmount',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Rate of interest',
          field: 'rateOfInterest',
          hideFilter: false,
          isSortable: false,
          filterField: 'rateOfInterest',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Loan Status',
          field: 'loanStatus',
          hideFilter: false,
          isSortable: false,
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

  initializeGidConfig() {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Client Name',
          field: 'clientName',
          hideFilter: false,
          filterField: 'clientName',
          filterType: EGridFilterType.STRING
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

  getBankerDetails(payload: any) {
    return this.accService.getBankerDetails(payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankerLeads(payload: any) {
    return this.applicationService.getBankerLeads(payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
}
