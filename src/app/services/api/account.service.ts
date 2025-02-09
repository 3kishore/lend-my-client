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

  createUser(payload: any): Observable<any> {
    return this.http.post(API.CREATE_USER(), payload).pipe(
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
}
