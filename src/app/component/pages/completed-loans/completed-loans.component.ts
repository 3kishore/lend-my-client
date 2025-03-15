import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CompletedLoansConfigService } from './completed-loans-config.service';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-completed-loans',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent],
  providers: [CompletedLoansConfigService],
  templateUrl: './completed-loans.component.html',
  styleUrl: './completed-loans.component.scss'
})
export class CompletedLoansComponent {

  gridConfig!: IServerSideGrid;

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean = true;

  sessionObj;

  constructor(
    private router: Router,
    private configService: CompletedLoansConfigService,
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
    const payload = {
      bankerId: this.sessionObj.userDetail.userId
    }
    this.component$.add(
      this.configService.getCompletedLoan(payload).subscribe({
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
