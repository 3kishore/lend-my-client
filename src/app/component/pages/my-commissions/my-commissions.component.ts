import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MyCommissionsConfigService } from './my-commissions-config.service';
import { CommonModule } from '@angular/common';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { ModalComponent } from '../../oraganisms/modal/modal.component';
import { IButton } from '../../atoms/button/button.interface';
import { EButtonType } from '../../atoms/button/button-type.enum';
import { Subscription } from 'rxjs';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-my-commissions',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule, ButtonComponent, MatMenuModule, MatDialogModule],
  providers: [MyCommissionsConfigService],
  templateUrl: './my-commissions.component.html',
  styleUrl: './my-commissions.component.scss'
})
export class MyCommissionsComponent {

  gridConfig!: IServerSideGrid;

  matDialogRef: MatDialogRef<ModalComponent>;

  manageConfig: IButton = {
    type: EButtonType.PRIMARY,
    customclass: 'primary stroke',
    id: 'manage',
    label: 'Manage',
    isDisabled: false,
    isActive: true,
    rightIconPath: '../../../../assets/icons/arrow-down-fill.svg'
  };

  component$ = new Subscription();

  gridActionData: IServerSideGridRefreshEvent;

  gridLoading: boolean;

  sessionObj;

  constructor(
    private router: Router,
    private configService: MyCommissionsConfigService,
    private matDialog: MatDialog,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {}

  ngOnInit(): void {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
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
    this.getMyCommissionsList();
  }

  getMyCommissionsList() {
    this.gridLoading = true
    const payload = {
      email: this.sessionObj.userDetail.email,
      referenceId: this.sessionObj.userDetail.userId
    }
    this.component$.add(
      this.configService.getMyCommissionsList(this.gridActionData, {}, {}, payload).subscribe({
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
    this.getMyCommissionsList();
  }

  backNavigate() {
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

}
