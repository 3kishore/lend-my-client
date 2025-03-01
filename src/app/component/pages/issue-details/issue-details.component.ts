import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IssueDetailsConfigService } from './issue-details-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP } from '../../../utils/constants/APP.const';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [CommonModule],
  providers: [IssueDetailsConfigService],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss'
})
export class IssueDetailsComponent {

  refreshFailed = false;

  isLoading = true;

  queryParam;

  issueDetails: any;

  constructor(private configService: IssueDetailsConfigService, activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe({
      next: (resp) => {
        this.queryParam = resp;
        this.getMyPartnerTickets();
      }
    })
  }

  getMyPartnerTickets() {
    this.isLoading = true;
    this.refreshFailed = false;
    this.configService.getIssueDetails(this.queryParam).subscribe({
      next: (resp) => {
        this.isLoading = false;
        if(resp.status) {
          this.issueDetails = resp.content;
        } else {
          this.refreshFailed = true;
        }
      }, error: (err) => {
        this.isLoading = false;
        this.refreshFailed = true;
      }
    })
  }

  back() {
      this.router.navigate([APP.ROUTES.EXECUTIVE_SUPPORT_TICKET]);
    }
}
