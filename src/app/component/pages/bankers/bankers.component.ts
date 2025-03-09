import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BankersConfigService } from './bankers-config.service';
import { CommonModule } from '@angular/common';
import { ServerSideGridComponent } from '../../oraganisms/server-side-grid/server-side-grid.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IServerSideGrid } from '../../oraganisms/server-side-grid/IServerSideGrid';
import { IServerSideGridRefreshEvent } from '../../oraganisms/server-side-grid/IServerSideGridRefreshEvent';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bankers',
  standalone: true,
  imports: [CommonModule, ServerSideGridComponent, RouterModule, ButtonComponent],
  providers: [BankersConfigService],
  templateUrl: './bankers.component.html',
  styleUrl: './bankers.component.scss'
})
export class BankersComponent implements OnInit {

  gridLoading: boolean = true;

  gridConfig!: IServerSideGrid;

  gridActionData: IServerSideGridRefreshEvent;
  
  @ViewChild('bankerNameTemplate', { static: true })
  public bankerNameTemplate: TemplateRef<any>;

  constructor(private config: BankersConfigService) { }

  ngOnInit(): void {
    this.gridConfig = this.config.initializeGidConfig(this.bankerNameTemplate)
    this.gridActionData = {
      filters: [],
      sort: {
        sortKey: '',
        sortType: ''
      },
      pageSize: this.gridConfig.pageSize,
      pageNo: this.gridConfig.pageNumber
    }
    this.getBankersList()
  }

  onGridAction(event: IServerSideGridRefreshEvent) {
    this.gridActionData = event;
    // this.getLoanStatus();
  }

  getBankersList() {
    this.gridLoading = true;
    this.config.getBankersList().subscribe({
      next: (resp) => {
        this.gridLoading = false;
        if(resp.status) {
          this.gridConfig.data = resp.content;
          this.gridConfig.total = resp.totalElement;
        } else {
          // this.gridConfig
        }
      },
      error: (err) => {
        this.gridLoading = false;
      }
    })
  }
  
}
