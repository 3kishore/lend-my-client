import { CommonModule } from '@angular/common';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { Router, RouterModule } from '@angular/router';
import { APP } from '../../../utils/constants/APP.const';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { Subscription } from 'rxjs';
import { BankerLeadsConfigService } from './banker-leads-config.service';

@Component({
  selector: 'app-banker-leads',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule],
  providers: [BankerLeadsConfigService],
  templateUrl: './banker-leads.component.html'
})
export class BankerLeadsComponent {

  gridConfig!: IServerSideGrid;

  @ViewChild('requestIdTemplate', { static: true })
  public requestIdTemplate: TemplateRef<any>;

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean;

  sessionObj;

  constructor(
    private router: Router,
    private configService: BankerLeadsConfigService,
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
    this.getMyLeads();
  }

  getMyLeads() {
    this.gridLoading = true;
    const payload = {
      bankerId: this.sessionObj.userDetail.userId
    }
    this.component$.add(
      this.configService.getMyLeads(payload).subscribe({
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
    this.getMyLeads();
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

  ngOnDestroy() {
    this.component$.unsubscribe();
  }
}
