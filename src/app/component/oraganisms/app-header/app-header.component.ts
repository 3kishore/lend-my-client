import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from "@angular/material/menu";
import { AppHeaderConfigService } from './app-header-config.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../utils/storage/session-storage.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { MatDialog } from '@angular/material/dialog';
import { APP } from '../../../utils/constants/APP.const';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatMenuModule, CommonModule, MatDividerModule, CreateAccountComponent],
  providers: [AppHeaderConfigService],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']

})
export class AppHeaderComponent implements OnInit{

  @Input() customerName: string = '';

  @Input() isDarkMode = false;

  readonly dialog = inject(MatDialog);

  sessionObj;

  userRole = '';

  currentScreenSize = APP.SCREENS_SIZE.SMALL;

  screenSizes = APP.SCREENS_SIZE;

  constructor(
    private configService: AppHeaderConfigService,
    private sessionStorage: SessionStorageService,
    private route: Router,
    private commonService: CommonHelperService
  ) {}

  sortName!: string;

  ngOnInit(): void {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.userRole = this.sessionObj.userDetail.role;
    if(this.customerName) {
      this.sortName = this.customerName[0];
    }
    this.commonService.screens.subscribe({
      next: (resp) => {
        this.currentScreenSize = resp.screenType;
      }
    })
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }

  createUser(): void {
    this.dialog.open(CreateAccountComponent);
  }

}
