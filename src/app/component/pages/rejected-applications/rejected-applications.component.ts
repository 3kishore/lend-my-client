import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { RejectedApplicationsConfigService } from './rejected-applications-config.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-partner-rejected-loans',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent],
  providers: [RejectedApplicationsConfigService],
  templateUrl: './rejected-applications.component.html'
})
export class RejectedApplicationsComponent {

  gridConfig!: IServerSideGrid;

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean = true;

  sessionObj;

  private snackBar = inject(MatSnackBar);

  constructor(
    private configService: RejectedApplicationsConfigService,
    private commonService: CommonHelperService
  ) { 
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.gridConfig = configService.initializeGidConfig();
    this.getRejectedApplication();
  }
  
  getRejectedApplication() {
    this.gridLoading = true;
    this.configService.getRejectedApplication({userId: this.sessionObj.userDetail.userId}).subscribe({
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
    // this.getRejectedApplication();
  }
}
