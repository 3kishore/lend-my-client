import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppDataService } from './utils/storage/app-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'financial-solution-ui';

  showLoader = false;

  constructor(private appData: AppDataService) {
    appData.appLoader.subscribe({
      next: (resp) => {
        console.log(resp)
        this.showLoader = resp;
      }
    })
  }
}
