import { Component, OnInit } from '@angular/core';
import { IssueDetailsConfigService } from '../issue-details/issue-details-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP } from '../../../utils/constants/APP.const';
import { CommonModule } from '@angular/common';
import { BankersDetailConfigService } from './bankers-detail-config.service';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';

@Component({
  selector: 'app-bankers-detail',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent],
  providers: [BankersDetailConfigService],
  templateUrl: './bankers-detail.component.html',
  styleUrl: './bankers-detail.component.scss'
})
export class BankersDetailComponent implements OnInit {

  refreshFailed = false;

  isLoading = true;

  queryParam;

  bankerDetails: any;

  gridLoading: boolean = true;
  
  gridConfig!: IServerSideGrid;
  
  gridActionData: IServerSideGridRefreshEvent;

  constructor(private configService: BankersDetailConfigService, activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe({
      next: (resp) => {
        console.log(resp)
        this.queryParam = resp;
      }
    })
  }

  ngOnInit(): void {
    this.gridConfig = this.configService.initializeGidConfig()
    this.gridActionData = {
      filters: [],
      sort: {
        sortKey: '',
        sortType: ''
      },
      pageSize: this.gridConfig.pageSize,
      pageNo: this.gridConfig.pageNumber
    }
    this.getBankerDetails();
    this.getAssignedCustomerOfBanker();
  }

  refresh() {
    this.getBankerDetails();
    this.getAssignedCustomerOfBanker();
  }

  getBankerDetails() {
    this.isLoading = true;
    this.refreshFailed = false;
    this.configService.getBankerDetails(this.queryParam).subscribe({
      next: (resp) => {
        this.isLoading = false;
        if(resp.status) {
          this.bankerDetails = resp.content;
        } else {
          this.refreshFailed = true;
        }
      }, error: (err) => {
        this.isLoading = false;
        this.refreshFailed = true;
      }
    })
  }

  getAssignedCustomerOfBanker() {
    this.gridLoading = true;
    this.configService.getBankerLeads(this.queryParam).subscribe({
      next: (resp: any) => {
        this.gridLoading = false;
        if(resp.status) {
          this.gridConfig.data = resp.content;
          this.gridConfig.total = resp.totalElement;
        }
      }, error: (err) => {
        this.gridLoading = false;
        this.refreshFailed = true;
      }
    })
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
  }

  back() {
    this.router.navigate([APP.ROUTES.BANKERS]);
  }
}
