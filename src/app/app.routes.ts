import { Routes } from '@angular/router';
import { APP } from './utils/constants/APP.const';
import { AuthGuard } from './services/gurads/auth.gurads';
import { LoginGuard } from './services/gurads/login.guards';
import { BankerGuard } from './services/gurads/banker.guard';
import { CreateSupportTicketGuard } from './services/gurads/create-support-ticket.guard';
import { LoanGuard } from './services/gurads/loan.guard';
import { PartnerGuard } from './services/gurads/partner.guard';
import { ExecutiveGuard } from './services/gurads/executive.guard';

export const routes: Routes = [
  {
    path: APP.ROUTES.LOGIN,
    loadComponent: () => import('./component/pages/login/login.component').then(c => c.LoginComponent),
    canActivate: [LoginGuard]
  },
  {
    path: `${APP.ROUTES.RESET_PASSWORD}${APP.ROUTES.REQUEST_ID}${APP.ROUTES.EMAIL}`,
    loadComponent: () => import('./component/pages/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
  },
  {
    path: '',
    loadComponent: () => import('./component/oraganisms/app-layout/app-layout.component').then(c => c.AppLayoutComponent),
    children: [
      {
        path: APP.ROUTES.LOAN_APPLICATION_STATUS,
        loadComponent: () => import('./component/pages/application-status/application-status.component').then(c => c.ApplicationStatusComponent),
        canActivate: [AuthGuard, LoanGuard]
      },
      {
        path: APP.ROUTES.COMPLETED_APPLICATIONS,
        loadComponent: () => import('./component/pages/completed-applications/completed-applications.component').then(c => c.CompletedApplicationsComponent),
        canActivate: [AuthGuard, LoanGuard]
      },
      {
        path: APP.ROUTES.REJECTED_APPLICATIONS,
        loadComponent: () => import('./component/pages/rejected-applications/rejected-applications.component').then(c => c.RejectedApplicationsComponent),
        canActivate: [AuthGuard, LoanGuard]
      },
      {
        path: APP.ROUTES.APPLY_LOAN,
        loadComponent: () => import('./component/pages/apply-loan/apply-loan.component').then(c => c.ApplyLoanComponent),
        canActivate: [AuthGuard, LoanGuard]
      },
      {
        path: `${APP.ROUTES.CLIENT_DETAIL}${APP.ROUTES.CLIENT_ID}${APP.ROUTES.EMAIL}`,
        loadComponent: () => import('./component/pages/client-details/client-details.component').then(c => c.ClientDetailsComponent),
        canActivate: [AuthGuard, LoanGuard]
      },
      {
        path: APP.ROUTES.MY_COMMISSIONS,
        loadComponent: () => import('./component/pages/my-commissions/my-commissions.component').then(c => c.MyCommissionsComponent),
        canActivate: [AuthGuard, PartnerGuard]
      },
      {
        path: APP.ROUTES.ORDER,
        loadComponent: () => import('./component/pages/executive-view/executive-view.component').then(c => c.ExecutiveViewComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: APP.ROUTES.COMPLETED_ORDERS,
        loadComponent: () => import('./component/pages/completed-orders/completed-orders.component').then(c => c.CompletedOrdersComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: APP.ROUTES.REJECTED_ORDERS,
        loadComponent: () => import('./component/pages/rejected-orders/rejected-orders.component').then(c => c.RejectedOrdersComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: `${APP.ROUTES.ORDER}${APP.ROUTES.REQUEST_ID}${APP.ROUTES.PARTNER_ID}`,
        loadComponent: () => import('./component/pages/order-detail/order-detail.component').then(c => c.OrderDetailComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: APP.ROUTES.MY_SUPPORT_TICKETS,
        loadComponent: () => import('./component/pages/my-support-ticket/my-support-ticket.component').then(c => c.MySupportTicketComponent),
        canActivate: [AuthGuard, CreateSupportTicketGuard]
      },
      {
        path: APP.ROUTES.CREATE_NEW_SUPPORT_TICKET,
        loadComponent: () => import('./component/pages/create-support-ticket/create-support-ticket.component').then(c => c.CreateSupportTicketComponent),
        canActivate: [AuthGuard, CreateSupportTicketGuard]
      },
      {
        path: APP.ROUTES.EXECUTIVE_SUPPORT_TICKET,
        loadComponent: () => import('./component/pages/executive-support/executive-support.component').then(c => c.ExecutiveSupportComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: `${APP.ROUTES.VIEW_TICKET_DETAILS}${APP.ROUTES.PARTNER_ID}${APP.ROUTES.ISSUE_ID}`,
        loadComponent: () => import('./component/pages/issue-details/issue-details.component').then(c => c.IssueDetailsComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: APP.ROUTES.MY_LEADS,
        loadComponent: () => import('./component/pages/banker-leads/banker-leads.component').then(c => c.BankerLeadsComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: APP.ROUTES.COMPLETED_LEADS,
        loadComponent: () => import('./component/pages/completed-loans/completed-loans.component').then(c => c.CompletedLoansComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: APP.ROUTES.REJECTED_LEADS,
        loadComponent: () => import('./component/pages/rejected-loans/rejected-loans.component').then(c => c.RejectedLoansComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: APP.ROUTES.ACCEPETD_LEADS,
        loadComponent: () => import('./component/pages/accepted-loans/accepted-loans.component').then(c => c.AcceptedLoansComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: `${APP.ROUTES.ACCEPETD_LEADS}${APP.ROUTES.LOAN_ID}`,
        loadComponent: () => import('./component/pages/accepted-client-details/accepted-client-details.component').then(c => c.AcceptedClientDetailsComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: `${APP.ROUTES.MY_LEADS}${APP.ROUTES.LOAN_ID}`,
        loadComponent: () => import('./component/pages/lead-details/lead-details.component').then(c => c.LeadDetailsComponent),
        canActivate: [AuthGuard, BankerGuard]
      },
      {
        path: APP.ROUTES.BANKERS,
        loadComponent: () => import('./component/pages/bankers/bankers.component').then(c => c.BankersComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: `${APP.ROUTES.BANKERS}${APP.ROUTES.BANKER_ID}`,
        loadComponent: () => import('./component/pages/bankers-detail/bankers-detail.component').then(c => c.BankersDetailComponent),
        canActivate: [AuthGuard, ExecutiveGuard]
      },
      {
        path: '', redirectTo: APP.ROUTES.LOAN_APPLICATION_STATUS, pathMatch: 'full'
      },
      {
        path: '**', redirectTo: APP.ROUTES.LOAN_APPLICATION_STATUS, pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: APP.ROUTES.LOGIN, pathMatch: 'full'
  },
  {
    path: '**', redirectTo: APP.ROUTES.LOGIN, pathMatch: 'full'
  }
];
