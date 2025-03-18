import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from '@angular/material/divider';
import { APP } from '../../../utils/constants/APP.const';
import { SessionStorageService } from '../../../utils/storage/session-storage.service';
import { AppDataService } from '../../../utils/storage/app-data.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, AppFooterComponent, RouterModule, MatSidenavModule, MatDividerModule],
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private sessionStorageService: SessionStorageService,
    private dataService: AppDataService,
    private commonService: CommonHelperService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let url = event.url;
        if(url && url.split('/').length > 1) {
          this.selectedMenu = this.getPathName(url.split('/')[1]);
        }
      }
    });
  }

  public isExpanded = true;

  isDarkMode: boolean = true;

  customerName: string = '';

  routes = APP.ROUTES;
  
  selectedMenu = APP.ROUTES.LOAN_APPLICATION_STATUS;

  sessionObj;

  userRole = '';

  isPanelClickLocked = false;

  ngOnInit(): void {
    this.selectedMenu = this.getPathName(window.location.pathname.split('/')[1]);
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.userRole = this.sessionObj.userDetail.role;
    this.customerName =  this.sessionObj.userDetail.firstName;
    setTimeout(() => {
      this.themeChange(this.sessionStorageService.getItem('theme'));
    }, 100);
    this.commonService.screens.subscribe({
      next: (resp) => {
        this.isPanelClickLocked = (resp.screenType === APP.SCREENS_SIZE.SMALL) || (resp.screenSize < 750);
        this.isExpanded = !((resp.screenType === APP.SCREENS_SIZE.SMALL) || (resp.screenSize < 750));
      }
    })
  }

  getPathName(pathName) {
    if(pathName === APP.ROUTES.CLIENT_DETAIL) {
      pathName = APP.ROUTES.LOAN_APPLICATION_STATUS;
    } else if(pathName === APP.ROUTES.CREATE_NEW_SUPPORT_TICKET) {
      pathName = APP.ROUTES.MY_SUPPORT_TICKETS;
    }
    return pathName;
  }

  routeToMyLoanStatus() {
    this.selectedMenu = APP.ROUTES.LOAN_APPLICATION_STATUS;
    this.router.navigate([APP.ROUTES.LOAN_APPLICATION_STATUS]);
  }

  routeToCompletedApplication() {
    this.selectedMenu = APP.ROUTES.COMPLETED_APPLICATIONS;
    this.router.navigate([APP.ROUTES.COMPLETED_APPLICATIONS]);
  }

  routeToRejectedApplication() {
    this.selectedMenu = APP.ROUTES.REJECTED_APPLICATIONS;
    this.router.navigate([APP.ROUTES.REJECTED_APPLICATIONS]);
  }

  routeToCompletedOrders() {
    this.selectedMenu = APP.ROUTES.COMPLETED_ORDERS;
    this.router.navigate([APP.ROUTES.COMPLETED_ORDERS]);
  }

  routeToRejectedOrders() {
    this.selectedMenu = APP.ROUTES.REJECTED_ORDERS;
    this.router.navigate([APP.ROUTES.REJECTED_ORDERS]);
  }

  routeToApplyLoan() {
    this.selectedMenu = APP.ROUTES.APPLY_LOAN;
    this.router.navigate([APP.ROUTES.APPLY_LOAN]);
  }

  routeToMyCommissions() {
    this.selectedMenu = APP.ROUTES.MY_COMMISSIONS;
    this.router.navigate([APP.ROUTES.MY_COMMISSIONS]);
  }

  routeToExecutiveView() {
    this.selectedMenu = APP.ROUTES.ORDER;
    this.router.navigate([APP.ROUTES.ORDER]);
  }

  routeToMySupportTicket() {
    this.selectedMenu = APP.ROUTES.MY_SUPPORT_TICKETS;
    this.router.navigate([APP.ROUTES.MY_SUPPORT_TICKETS]);
  }

  routeToMyLeads() {
    this.selectedMenu = APP.ROUTES.MY_LEADS;
    this.router.navigate([APP.ROUTES.MY_LEADS]);
  }

  routeToAcceptedLoans() {
    this.selectedMenu = APP.ROUTES.ACCEPETD_LEADS;
    this.router.navigate([APP.ROUTES.ACCEPETD_LEADS]);
  }

  routeToMyCompletedLoans() {
    this.selectedMenu = APP.ROUTES.COMPLETED_LEADS;
    this.router.navigate([APP.ROUTES.COMPLETED_LEADS]);
  }

  routeToMyRejectedLoans() {
    this.selectedMenu = APP.ROUTES.REJECTED_LEADS;
    this.router.navigate([APP.ROUTES.REJECTED_LEADS]);
  }

  routeToExecutiveSupportTicket() {
    this.selectedMenu = APP.ROUTES.EXECUTIVE_SUPPORT_TICKET;
    this.router.navigate([APP.ROUTES.EXECUTIVE_SUPPORT_TICKET]);
  }

  routeToBankersPage() {
    this.selectedMenu = APP.ROUTES.BANKERS;
    this.router.navigate([APP.ROUTES.BANKERS]);
  }

  themeChange(theme: string) {
    const body = this.renderer.selectRootElement('body', true);
    if(theme == 'dark') {
      this.renderer.addClass(body, 'dark');
      this.isDarkMode = true;
      this.dataService.updatetheme('dark');      
    } else {
      this.renderer.removeClass(body, 'dark');
      this.isDarkMode = false;
      this.dataService.updatetheme('light'); 
    }
    this.sessionStorageService.setItem('theme', this.isDarkMode? 'dark' : 'light');
  }

}
