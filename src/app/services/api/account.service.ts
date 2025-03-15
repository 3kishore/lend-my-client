import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { API } from '../../utils/constants/API.const';
import { environment } from '../../../environments/environment';
import { MOCK_DATA } from '../../utils/constants/mock.const';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  validateAuthToken(): Observable<any> {
    return this.http.get(API.VALIDATE_TOKEN('1')).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  auth(payload: any): Observable<any> {
    return this.http.post(API.AUTHENTICATE(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  logout(payload: any): Observable<any> {
    return this.http.get(API.LOGOUT()).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getCustomerDetails(payload: any): Observable<any> {
    return this.http.post(API.GET_CUSTOMER_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getOrderDetails(payload: any): Observable<any> {
    return this.http.post(API.GET_ORDER_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  updateDesposementStatus(payload: any): Observable<any> {
    return this.http.post(API.UPDATE_DESPOSEMENT_STATUS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  updateLoanDetails(payload: any): Observable<any> {
    return this.http.post(API.UPDATE_LOAN_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  rejectLoan(payload: any): Observable<any> {
    return this.http.post(API.REJECT_LOAN(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  assignBanker(payload: any): Observable<any> {
    return this.http.post(API.ASSIGN_BANKER(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getAssignedBankers(payload: any): Observable<any> {
    return this.http.post(API.GET_ASSIGNED_BANKERS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  rejectBankerProposal(payload: any): Observable<any> {
    return this.http.post(API.REJECT_BANKER_PROPOSAL(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  acceptBankerProposal(payload: any): Observable<any> {
    return this.http.post(API.ACCEPT_BANKER_PROPOSAL(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  createUser(payload: any): Observable<any> {
    return this.http.post(API.CREATE_USER(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  createBanker(payload: any): Observable<any> {
    return this.http.post(API.CREATE_BANKER(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankingPartners(): Observable<any> {
    return this.http.post(API.GET_BANKING_PARTNERS(), {}).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankingPartnersAndPartners(): Observable<any> {
    return this.http.post(API.GET_BANKING_PARTNERS_AND_BANKERS(), {}).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankingPartnersAndBanker(): Observable<any> {
    return this.http.post(API.GET_BANKING_PARTNERS(), {}).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankersList(): Observable<any> {
    return this.http.post(API.GET_BANKERS_LIST(), {}).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  assignBankers(payload: any): Observable<any> {
    return this.http.post(API.GET_BANKERS_LIST(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  resetPass(payload: any): Observable<any> {
    return this.http.post(API.RESET_PASSWORD_REQUEST(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  validateToken(payload: any): Observable<any> {
    return this.http.get(API.TOKEN_VALIDATION()).pipe(
      map(resp => MOCK_DATA.VALIDATE_PASS_TOKEN)
    )
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post(API.CHANGE_PASSWORD(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getMySupportTicket(payload: any): Observable<any> {
    return this.http.post(API.GET_MY_SUPPORT_TICKETS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  createSupportTicket(payload: any): Observable<any> {
    return this.http.post(API.CREATE_SUPPORT_TICKET(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getPartnerSupportTickets(): Observable<any> {
    return this.http.post(API.GET_MY_PARTNER_SUPPORT_TICKETS(), {}).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  updateMyIssueDetails(payload: any): Observable<any> {
    return this.http.post(API.UPDATE_ISSUE_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getIssueDetails(payload: any): Observable<any> {
    return this.http.post(API.GET_ISSUE_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getBankerDetails(payload: any): Observable<any> {
    return this.http.post(API.GET_BANKER_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }

  getAssignedCustomerOfBanker(payload: any): Observable<any> {
    return this.http.post(API.GET_ASSIGNED_CUSTOMER_OF_BANKER(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    )
  }
}
