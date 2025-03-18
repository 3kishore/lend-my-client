import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { API } from '../../utils/constants/API.const';
import { MOCK_DATA } from '../../utils/constants/mock.const';

@Injectable({
  providedIn: 'root'
})
export class LoanApplicationsService {

  constructor(private http: HttpClient) { }

  getBankDetail(payload: any) {
    return this.http.post(API.GET_BANK_DETAILS(), payload).pipe(
      map(resp => MOCK_DATA.BANK_DETAILS),
      catchError(err => err)
    );
  }

  getLoanStatus(payload: any) {
    return this.http.post(API.GET_MY_APPLICATIONS_STATUS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getLoanStatus_2(payload: any) {
    return this.http.post(API.GET_MY_APPLICATIONS_STATUS(), payload).pipe(
      map(resp => MOCK_DATA.LOAN_STATUS),
      catchError(err => err)
    );
  }

  getAllLoanRequests(payload: any) {
    return this.http.post(API.GET_ALL_LOAN_REQUESTS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getMyLeads(payload: any) {
    return this.http.post(API.GET_MY_LEADS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getBankerLeads(payload: any) {
    return this.http.post(API.GET_BANKER_LEADS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getLoanDetails(payload: any) {
    return this.http.post(API.GET_LOAN_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getAcceptedLoans(payload: any) {
    return this.http.post(API.GET_ACCEPTED_LOANS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getCompletedLoan(payload: any) {
    return this.http.post(API.GET_COMPLETED_LOANS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getRejectedLoan(payload: any) {
    return this.http.post(API.GET_REJECTED_LOANS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  updateLoanStatus(payload: any) {
    return this.http.post(API.UPDATE_LOAN_STATUS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  updateBankDetails(payload: any) {
    return this.http.post(API.UPDATE_BANK_DETAILS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  changeApplicationStatus(payload: any) {
    return this.http.post(API.CHANGE_APPLICATIONS_STATUS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getRejectedApplication(payload: any) {
    return this.http.post(API.GET_REJECTED_APPLICATIONS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getCompletedApplication(payload: any) {
    return this.http.post(API.GET_COMPLETED_APPLICATIONS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getCompletedOrders(payload: any) {
    return this.http.post(API.GET_COMPLETED_ORDERS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getRejectedOrders(payload: any) {
    return this.http.post(API.GET_REJECTED_ORDERS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  applyForLoan(payload: any) {
    return this.http.post(API.APPLY_FOR_LOAN(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }

  getMyCommissionsList(payload: any) {
    return this.http.post(API.GET_MY_COMMISSIONS(), payload).pipe(
      map(resp => resp),
      catchError(err => err)
    );
  }
}
