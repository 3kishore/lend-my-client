import { Injectable, TemplateRef } from '@angular/core';
import { catchError, map } from 'rxjs';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';

@Injectable()
export class AcceptedLoansConfigService {

  
    constructor(
        private loanStatus: LoanApplicationsService
      ) {}
    
    initializeGidConfig(template: TemplateRef<any>) {
      let gridConfig: IServerSideGrid = {
        columns: [
          {
            label: 'Client Name',
            field: 'clientName',
            hideFilter: false,
            filterField: 'clientName',
            filterType: EGridFilterType.STRING,
            cellTemplate: template
          },
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
            label: 'Max Loan Amount',
            field: 'maxLoanAmount',
            filterField: 'maxLoanAmount',
            filterType: EGridFilterType.NUMBER,
            customClass: 'justify-end'
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
            label: 'Loan Status',
            field: 'loanStatus',
            hideFilter: true,
            isSortable: true,
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
  
    getMyLeads(params: any) {
      return this.loanStatus.getMyLeads(params).pipe(
        map(resp => resp),
        catchError((err) => err)
      )
    }

    getAcceptedLoans(params: any) {
      return this.loanStatus.getAcceptedLoans(params).pipe(
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
