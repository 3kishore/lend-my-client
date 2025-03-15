import { Component, TemplateRef, ViewChild } from '@angular/core';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { APP } from '../../../utils/constants/APP.const';
import { AcceptedLoansConfigService } from './accepted-loans-config.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accepted-loans',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule],
  providers: [AcceptedLoansConfigService],
  templateUrl: './accepted-loans.component.html',
  styleUrl: './accepted-loans.component.scss'
})
export class AcceptedLoansComponent {

  gridConfig!: IServerSideGrid;

  @ViewChild('requestIdTemplate', { static: true })
  public requestIdTemplate: TemplateRef<any>;

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean;

  sessionObj;

  constructor(
    private router: Router,
    private configService: AcceptedLoansConfigService,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.gridConfig = this.configService.initializeGidConfig(this.requestIdTemplate);
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
    this.getAcceptedLoans();
  }

  getAcceptedLoans() {
    this.gridLoading = true
    console.log(this.sessionObj, this.sessionObj.userId)
    const payload = {
      bankerId: this.sessionObj.userDetail.userId
    }
    this.component$.add(
      this.configService.getAcceptedLoans(payload).subscribe({
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
    this.getAcceptedLoans();
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
