import { Injectable, TemplateRef } from '@angular/core';
import { catchError, map } from 'rxjs';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';

@Injectable()
export class ExecutiveViewConfigService {
  
  constructor(
    private loanStatus: LoanApplicationsService,
    private commonHelperService: CommonHelperService
  ) {}

//   {
//     "description": "Contructing new things",
//     "email": "kishore@gmail.com",
//     "firstName": "Kishore",
//     "lastName": "K",
//     "loanAmount": "100000",
//     "loanFor": "Others",
//     "loanStatus": "contacted",
//     "loanType": "Home Loan",
//     "middleName": "",
//     "mobileNumber": "8190805490",
//     "referenceEmail": "gokulkishore393@gmail.com",
//     "referenceId": "380f5d7b-f1b6-5763-928f-546c933e7594",
//     "remarks": "",
//     "requestId": "238c60eb-7bd8-590d-a63e-e3f63f330a8e",
//     "requestTime": "2025-02-02 18:18:33"
// },
  initializeGidConfig(template: TemplateRef<any>, updateBankDetailsTemplate: TemplateRef<any>) {
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
          label: 'Partner ID',
          field: 'referenceId',
          hideFilter: false,
          filterField: 'referenceId',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Partner Name',
          field: 'partnerName',
          hideFilter: false,
          filterField: 'partnerName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Client Name',
          field: 'firstName',
          hideFilter: false,
          isSortable: false,
          filterField: 'firstName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Loan Amount',
          field: 'loanAmount',
          filterField: 'loanAmount',
          filterType: EGridFilterType.NUMBER,
          numericFilter: APP.NUMERIC_fILTER_OPTIONS[0],
          customClass: 'justify-end',
          isSortable: false,
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
        },
        {
          label: 'Loan Status',
          field: 'loanStatus',
          hideFilter: true,
          isSortable: true,
          filterField: 'loanStatus',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Date',
          field: 'requestTime',
          hideFilter: true,
          isSortable: true,
          filterField: 'requestTime',
          filterType: EGridFilterType.STRING
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
        },
        {
          label: 'Bank Details',
          field: 'banks',
          hideFilter: true,
          isSortable: false,
          filterField: 'banks',
          cellTemplate: updateBankDetailsTemplate
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
      isSelectable: false
    }
    return gridConfig;
  }

  getAllLoanRequests(gridActionData: IServerSideGridRefreshEvent, overAllSearch: any, params: any) {
    let payload = this.commonHelperService.getGridPayload(gridActionData, overAllSearch, params);
    return this.loanStatus.getAllLoanRequests(payload).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }

  updateLoanStatus(payload) {
    return this.loanStatus.updateLoanStatus(payload).pipe(
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
