import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppDataService } from './utils/storage/app-data.service';
import { CommonModule } from '@angular/common';
import { CommonHelperService } from './utils/helpers/common-helper.service';
import { APP } from './utils/constants/APP.const';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financial-solution-ui';

  @HostListener('window:resize', [])
    onResize() {
      this.checkScreenSize();
    }

  showLoader = false;

  constructor(private appData: AppDataService, private commonService: CommonHelperService) {
    appData.appLoader.subscribe({
      next: (resp) => {
        this.showLoader = resp;
      }
    })
    this.checkScreenSize();
  }

  checkScreenSize() {
    if(window.innerWidth <= 450) {
      this.commonService.screens.next({screenSize: window.innerWidth, screenType: APP.SCREENS_SIZE.SMALL});
    } else if(window.innerWidth <= 700) {
      this.commonService.screens.next({screenSize: window.innerWidth, screenType: APP.SCREENS_SIZE.MEDIUM});
    } else if(window.innerWidth <= 980) {
      this.commonService.screens.next({screenSize: window.innerWidth, screenType: APP.SCREENS_SIZE.LARGE});
    } else {
      this.commonService.screens.next({screenSize: window.innerWidth, screenType: APP.SCREENS_SIZE.EXTRA_LARGE});
    }
  }
}
