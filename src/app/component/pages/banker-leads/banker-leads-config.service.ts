import { Injectable, TemplateRef } from '@angular/core';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { catchError, map } from 'rxjs';

@Injectable()
export class BankerLeadsConfigService {

  constructor(
      private loanStatus: LoanApplicationsService,
      private commonHelperService: CommonHelperService
    ) {}
  
  initializeGidConfig(template: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Loan Type',
          field: 'loanType',
          hideFilter: false,
          filterField: 'loanType',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Requested Amount',
          field: 'requestedLoanAmount',
          hideFilter: false,
          filterField: 'requestedLoanAmount',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Client Name',
          field: 'clientName',
          hideFilter: false,
          filterField: 'clientName',
          filterType: EGridFilterType.STRING,
          cellTemplate: template
        },
        {
          label: 'Mobile Number',
          field: 'mobileNumber',
          hideFilter: false,
          isSortable: false,
          filterField: 'mobileNumber',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Amount Offered',
          field: 'maxLoanAmount',
          filterField: 'maxLoanAmount',
          filterType: EGridFilterType.NUMBER,
          customClass: 'justify-end'
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
          label: 'Date of assignment',
          field: 'date',
          hideFilter: true,
          isSortable: true,
          filterField: 'date',
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

  getMyLeads(params: any) {
    return this.loanStatus.getMyLeads(params).pipe(
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
