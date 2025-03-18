import { Component, inject } from '@angular/core';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';
import { CompletedOrdersConfigService } from './completed-orders-config.service';
import { CommonModule } from '@angular/common';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent],
  providers: [CompletedOrdersConfigService],
  templateUrl: './completed-orders.component.html',
  styleUrl: './completed-orders.component.scss'
})
export class CompletedOrdersComponent {

  gridConfig!: IServerSideGrid;
    
  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean = true;

  sessionObj;

  private snackBar = inject(MatSnackBar);

  constructor(
    private configService: CompletedOrdersConfigService,
    private commonService: CommonHelperService
  ) { 
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.gridConfig = configService.initializeGidConfig();
    this.getCompletedOrders();
  }
  
  getCompletedOrders() {
    this.gridLoading = true;
    this.configService.getCompletedOrders({userId: this.sessionObj.userDetail.userId}).subscribe({
      next: (resp: any) => {
        this.gridLoading = false;
        if(resp.status) {
          resp.content.forEach(val => {
            val.clientName = `${val.firstName} ${val.lastName}`;
          })
          this.gridConfig.data = resp.content;
          this.gridConfig.pageSize = resp.totalElement;
        } else {
          this.snackBar.open('Failed to get rejected loans.', '', {panelClass: ['danger-snackbar'], duration: 6000});
        }
      }, error: (err) => {
        this.gridLoading = false;
        this.snackBar.open('Failed to get rejected loans.', '', {panelClass: ['danger-snackbar'], duration: 6000});
      }
    })
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    // this.getCompletedOrders();
  }
}
