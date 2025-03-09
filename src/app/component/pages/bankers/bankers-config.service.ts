import { Injectable, TemplateRef } from '@angular/core';
import { EGridFilterType } from '../../oraganisms/server-side-grid/serversidegrid.enum';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { catchError, map } from 'rxjs';
import { AccountService } from '../../../services/api/account.service';

@Injectable()
export class BankersConfigService {

  constructor(
    private accService: AccountService
  ) { }

  initializeGidConfig(cusTemplate: TemplateRef<any>) {
    let gridConfig: IServerSideGrid = {
      columns: [
        {
          label: 'Bank Name',
          field: 'bankName',
          hideFilter: false,
          isSortable: false,
          filterField: 'bankName',
          filterType: EGridFilterType.STRING,
          cellTemplate: cusTemplate
        },
        {
          label: 'Banker Name',
          field: 'firstName',
          hideFilter: false,
          isSortable: false,
          filterField: 'firstName',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Branch',
          field: 'branch',
          hideFilter: false,
          isSortable: false,
          filterField: 'branch',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Assigned Loans',
          field: 'assignedLoans',
          hideFilter: false,
          isSortable: false,
          filterField: 'assignedLoans',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Desposed Loans',
          field: 'completedLoans',
          hideFilter: false,
          isSortable: false,
          filterField: 'completedLoans',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Inprogress Loans',
          field: 'inprogressLoans',
          hideFilter: false,
          isSortable: false,
          filterField: 'inprogressLoans',
          filterType: EGridFilterType.STRING
        },
        {
          label: 'Rejected Loans',
          field: 'rejectedLoans',
          hideFilter: false,
          isSortable: false,
          filterField: 'rejectedLoans',
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
      uniqueFieldOfData: 'orderId',
      isSelectable: false,
      expandableRows: false
    }
    return gridConfig;
  }

  getBankersList() {
    return this.accService.getBankersList().pipe(
      map(resp => resp),
      catchError((err) => err)
    )
  }
}
