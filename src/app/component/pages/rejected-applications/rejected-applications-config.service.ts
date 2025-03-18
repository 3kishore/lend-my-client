import { Injectable } from '@angular/core';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { catchError, map } from 'rxjs';
import { LoanApplicationsService } from '../../../services/api/loan-applications.service';

@Injectable()
export class RejectedApplicationsConfigService {

  constructor(
    private loanStatus: LoanApplicationsService
  ) { }

  initializeGidConfig() {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Client Name',
          field: 'clientName',
          hideFilter: true,
          filterField: 'clientName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Amount',
          field: 'loanAmount',
          filterField: 'loanAmount',
          filterType: EGridFilterType.NUMBER,
          hideFilter: true
        },
        {
          label: 'Loan Type',
          field: 'loanType',
          hideFilter: true,
          filterField: 'loanType',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Request ID',
          field: 'requestId',
          hideFilter: true,
          filterField: 'requestId',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Rejection reason',
          field: 'reasonForRejection',
          hideFilter: true,
          filterField: 'reasonForRejection',
          filterType: EGridFilterType.CHECKBOX
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

  getRejectedApplication(data) {
    return this.loanStatus.getRejectedApplication(data).pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }
}
