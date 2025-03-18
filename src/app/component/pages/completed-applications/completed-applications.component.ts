import { Component, inject } from '@angular/core';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompletedApplicationsConfigService } from './completed-applications-config.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';
import { APP } from '../../../utils/constants/APP.const';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-applications',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, ButtonComponent],
  providers: [CompletedApplicationsConfigService],
  templateUrl: './completed-applications.component.html'
})
export class CompletedApplicationsComponent {

  gridConfig!: IServerSideGrid;
  
    gridActionData: IServerSideGridRefreshEvent;
  
    gridLoading: boolean = true;
  
    sessionObj;
  
    private snackBar = inject(MatSnackBar);
  
    constructor(
      private configService: CompletedApplicationsConfigService,
      private commonService: CommonHelperService
    ) { 
      this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
      this.gridConfig = configService.initializeGidConfig();
      this.getCompletedApplication();
    }
    
    getCompletedApplication() {
      this.gridLoading = true;
      this.configService.getCompletedApplication({userId: this.sessionObj.userDetail.userId}).subscribe({
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
      // this.getCompletedApplication();
    }
}
