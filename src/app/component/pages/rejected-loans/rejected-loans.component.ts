import { Component } from '@angular/core';
import { RejectedLoansConfigService } from './rejected-loans-config.service';
import { CommonModule } from '@angular/common';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { Router } from '@angular/router';
import { CompletedLoansConfigService } from '../completed-loans/completed-loans-config.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rejected-loans',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent],
  providers: [RejectedLoansConfigService],
  templateUrl: './rejected-loans.component.html',
  styleUrl: './rejected-loans.component.scss'
})
export class RejectedLoansComponent {

  gridConfig!: IServerSideGrid;

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean = true;

  sessionObj;

  constructor(
    private router: Router,
    private configService: RejectedLoansConfigService,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.gridConfig = this.configService.initializeGidConfig();
    this.gridActionData = {
      filters: [],
      sort: {
        sortKey: '',
        sortType: ''
      },
      pageSize: this.gridConfig.pageSize,
      pageNo: this.gridConfig.pageNumber
    }
    this.gridConfig.selectedPageSize = 10;
    this.getCompletedLoan();
  }

  getCompletedLoan() {
    this.gridLoading = true
    this.component$.add(
      this.configService.getCompletedLoan(this.gridActionData, {}, {}).subscribe({
        next: (resp: any) =>  {
          this.gridConfig.data = resp.content;
          this.gridConfig.total = resp.totalElement;
          setTimeout(() => {
            this.gridLoading = false;
          }, 100);
        },
        error: (err) =>  {
          this.gridLoading = false
          console.log(err);
        },
      })
    )
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    this.getCompletedLoan();
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
