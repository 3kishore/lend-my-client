import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { CommonModule } from '@angular/common';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';
import { RejectedOrdersConfigService } from './rejected-orders-config.service';

@Component({
  selector: 'app-rejected-orders',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent],
  providers: [RejectedOrdersConfigService],
  templateUrl: './rejected-orders.component.html',
  styleUrl: './rejected-orders.component.scss'
})
export class RejectedOrdersComponent {

  gridConfig!: IServerSideGrid;

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean = true;

  sessionObj;

  private snackBar = inject(MatSnackBar);

  constructor(
    private configService: RejectedOrdersConfigService,
    private commonService: CommonHelperService
  ) { 
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.gridConfig = configService.initializeGidConfig();
    this.getRejectedOrders();
  }
  
  getRejectedOrders() {
    this.gridLoading = true;
    this.configService.getRejectedOrders({userId: this.sessionObj.userDetail.userId}).subscribe({
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
    // this.getRejectedOrders();
  }
}
