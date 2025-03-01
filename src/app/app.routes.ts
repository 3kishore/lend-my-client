import { Routes } from '@angular/router';
import { APP } from './utils/constants/APP.const';
import { AuthGuard } from './services/gurads/auth.gurads';
import { LoginGuard } from './services/gurads/login.guards';

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
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.APPLY_LOAN,
        loadComponent: () => import('./component/pages/apply-loan/apply-loan.component').then(c => c.ApplyLoanComponent),
        canActivate: [AuthGuard]
      },
      {
        path: `${APP.ROUTES.CLIENT_DETAIL}${APP.ROUTES.CLIENT_ID}${APP.ROUTES.EMAIL}`,
        loadComponent: () => import('./component/pages/client-details/client-details.component').then(c => c.ClientDetailsComponent),
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.MY_COMMISSIONS,
        loadComponent: () => import('./component/pages/my-commissions/my-commissions.component').then(c => c.MyCommissionsComponent),
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.EXECUTIVE_VIEW,
        loadComponent: () => import('./component/pages/executive-view/executive-view.component').then(c => c.ExecutiveViewComponent),
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.MY_SUPPORT_TICKETS,
        loadComponent: () => import('./component/pages/my-support-ticket/my-support-ticket.component').then(c => c.MySupportTicketComponent),
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.CREATE_NEW_SUPPORT_TICKET,
        loadComponent: () => import('./component/pages/create-support-ticket/create-support-ticket.component').then(c => c.CreateSupportTicketComponent),
        canActivate: [AuthGuard]
      },
      {
        path: APP.ROUTES.EXECUTIVE_SUPPORT_TICKET,
        loadComponent: () => import('./component/pages/executive-support/executive-support.component').then(c => c.ExecutiveSupportComponent),
        canActivate: [AuthGuard]
      },
      {
        path: `${APP.ROUTES.VIEW_TICKET_DETAILS}${APP.ROUTES.PARTNER_ID}${APP.ROUTES.ISSUE_ID}`,
        loadComponent: () => import('./component/pages/issue-details/issue-details.component').then(c => c.IssueDetailsComponent),
        canActivate: [AuthGuard]
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
