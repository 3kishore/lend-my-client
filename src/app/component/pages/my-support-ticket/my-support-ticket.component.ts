import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CardComponent } from '../../oraganisms/card/card.component';
import { IndicationBadgeComponent } from '../../atoms/count-badge/indication-badge.component';
import { MySupportTicketConfigService } from './my-support-ticket-config.service';
import { ICard } from '../../oraganisms/card/card.interface';
import { ErrorStateComponent } from '../../atoms/error-state/error-state.component';
import { IEmpty } from '../../atoms/error-state/error-state.interface';
import { EErrorState } from '../../atoms/error-state/error-state.enum';
import { APP } from '../../../utils/constants/APP.const';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-my-support-ticket',
  standalone: true,
  imports: [CommonModule, CardComponent, IndicationBadgeComponent, ErrorStateComponent, MatProgressSpinnerModule],
  providers: [MySupportTicketConfigService],
  templateUrl: './my-support-ticket.component.html'
})
export class MySupportTicketComponent implements OnInit {

  openTickets: Array<ICard> = [];

  resolvedTickets: Array<ICard> = [];

  error = false;

  isLoading = true;

  noDataExists = false;

  @ViewChild('ticketActionTemplate', {static: true})
  public ticketActionTemplate: TemplateRef<any>

  errorConfig: IEmpty;

  sessionObj;

  constructor(
    private configService: MySupportTicketConfigService,
    private route: Router,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
  }

  ngOnInit(): void {
    this.getMySupportTickets();
  }

  getMySupportTickets() {
    this.isLoading = true;
    this.error = false;
    this.noDataExists = false;
    const payload = {
      email: this.sessionObj.userDetail.email,
      userId: this.sessionObj.userDetail.userId
    }
    this.configService.getMySupportTickets(payload).subscribe({
      next: (resp) => {
        this.isLoading = false;
        if(resp.status) {
          this.error = false;
          let openIssues = resp.content.filter(val => val.issueStatus.toLowerCase() !== 'resolved');
          let cloedIssues = resp.content.filter(val => val.issueStatus.toLowerCase() === 'resolved');
          if(!openIssues.length && !cloedIssues.length) {
            this.errorConfig = this.configService.getNodataTemplate(this.getMySupportTickets.bind(this));
            this.noDataExists = true;
            this.openTickets = [];
            this.resolvedTickets = [];
          } else {
            this.errorConfig = this.configService.getNodataTemplate(this.getMySupportTickets.bind(this))
            this.openTickets = this.configService.getTicketsByStatus(openIssues, this.ticketActionTemplate);
            this.resolvedTickets = this.configService.getTicketsByStatus(cloedIssues, this.ticketActionTemplate);
          }
        } else {
          this.error = true;
          this.errorConfig = this.configService.getErrorTemplate(this.getMySupportTickets.bind(this));
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = true;
        this.errorConfig = this.configService.getErrorTemplate(this.getMySupportTickets.bind(this));
      }
    })
  }

  getIndicationBadgeConfig(badgeType: string) {
    return this.configService.getIndicationBadgeConfig(badgeType);
  }

  raiseNewSupportTicket() {
    this.route.navigate([APP.ROUTES.CREATE_NEW_SUPPORT_TICKET])
  }
}
