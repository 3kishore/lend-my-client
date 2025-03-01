import { Injectable, TemplateRef } from '@angular/core';
import { catchError, map } from 'rxjs';
import { AccountService } from '../../../services/api/account.service';
import { ICard } from '../../oraganisms/card/card.interface';
import { IIndicationBadge } from '../../atoms/count-badge/indication-badge.interface';
import { EIndicationBadge } from '../../atoms/count-badge/indication-badge-type.enum';
import { IEmpty } from '../../atoms/error-state/error-state.interface';
import { APP } from '../../../utils/constants/APP.const';
import { EErrorState } from '../../atoms/error-state/error-state.enum';

@Injectable()
export class MySupportTicketConfigService {

  constructor(
    private accService: AccountService
  ) {}

  getMySupportTickets(payload: any) {
    return this.accService.getMySupportTicket(payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getTicketsByStatus(data: Array<any>, template: TemplateRef<any>): Array<ICard> {
    let card: Array<ICard> = [];
    data.forEach(val => {
      let date = new Date(val.date);
      card.push({
        heading: val.regarding,
        headingNote: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        block: [
          {
            heading: val.category,
            description: val.description
          }
        ],
        action: [
          {
            label: val.issueStatus,
          }
        ],
        actionTemplate: template
      })
    })
    return card
  }

  getIndicationBadgeConfig(badgeType: string): IIndicationBadge {
    return {
      label: badgeType,
      type: badgeType.toLocaleLowerCase() === 'resolved' ? EIndicationBadge.INFO : EIndicationBadge.WARNING
    }
  }

  getNodataTemplate(action: Function): IEmpty {
    return {
      descriptions: [APP.MESSAGE.NO_DATA_FOUND_FOR_YOUR_USER],
      iconPath: '../../../../assets/icons/no-result-found.svg',
      title: APP.TITLE.NO_DATA,
      type: EErrorState.PAGE,
      hasRetryBtn: true,
      btnAction: action
    }
  }

  getErrorTemplate(action: Function): IEmpty {
    return {
      descriptions: [APP.MESSAGE.SUPPORT_TICKET_API_ERROR_MSG, APP.MESSAGE.KINDLY_RETRY_SOMETIME_LATER],
      iconPath: '../../../../assets/icons/error-icon.svg',
      title: APP.TITLE.ERROR_OCCURED,
      type: EErrorState.PAGE,
      hasRetryBtn: true,
      btnAction: action
    }
  }
}
