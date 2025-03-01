import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP } from '../../../utils/constants/APP.const';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateSupportTicketConfigService } from './create-support-ticket-config.service';
import { CommonHelperService } from '../../../utils/helpers/common-helper.service';

@Component({
  selector: 'app-create-support-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [CreateSupportTicketConfigService],
  templateUrl: './create-support-ticket.component.html',
  styleUrl: './create-support-ticket.component.scss'
})
export class CreateSupportTicketComponent {

  supportForm: FormGroup;

  message = '';

  ticketCreationFailed = false;

  ticketCreationSuccess = false;

  issueList = [
    'Client loand pending more 10 days',
    'Payment not recived',
    `Can't create new client`,
    `Can't view client details`
  ]

  sessionObj;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private config: CreateSupportTicketConfigService,
    private commonService: CommonHelperService
  ) {
    this.sessionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    this.supportForm = this.fb.group({
      regarding: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      category: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(30)])]
    })
  }

  back() {
    this.router.navigate([APP.ROUTES.MY_SUPPORT_TICKETS]);
  }

  submit() {
    this.ticketCreationFailed = false;
    this.ticketCreationSuccess = false;
    console.log(this.supportForm.value)
    const date = new Date();
    const payload = {
      partnerName: `${this.sessionObj.userDetail.firstName} ${this.sessionObj.userDetail.lastName}`,
      partnerMoileNo: this.sessionObj.userDetail.phoneNo,
      partnerEmailId: this.sessionObj.userDetail.email,
      partnerId: this.sessionObj.userDetail.userId,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      ...this.supportForm.value
    };
    console.log(payload);
    this.config.createSupportTicket(payload).subscribe({
      next: (resp) => {
        if(resp.status) {
          this.supportForm.reset();
          this.ticketCreationSuccess = true;
        } else {
          this.ticketCreationFailed = true;
          this.message = resp.message ? resp.message : 'Failed to create your support ticket kindly try again.';
        }
      },
      error: (err) => {
        this.ticketCreationFailed = true;
        this.message = 'Failed to create your support ticket kindly try again.';
      }
    })

  }
}
