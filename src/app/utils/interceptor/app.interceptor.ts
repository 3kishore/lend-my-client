import { HttpErrorResponse, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpInterceptorFn, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { SessionStorageService } from "../storage/session-storage.service";
import { SESSION_STORAGE_CONSTANTS } from "../storage/STORAGE-KEY.constant";
import { Router } from "@angular/router";
import { AppDataService } from "../storage/app-data.service";
import { CommonHelperService } from "../helpers/common-helper.service";
import { APP } from "../constants/APP.const";

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorServiceDI implements HttpInterceptor {

  constructor(
    private route: Router,
    private commonService: CommonHelperService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const essionObj = this.commonService.getSessionItem(APP.SESSION_ITEM_KEYS.SESSION, true);
    const clonedRequest = req.clone({
      setHeaders: {
        'x-access-token': essionObj ? essionObj.token : '',
      },
      body: {
        ...req.body,
      }
    });
    return this.handleRequest(clonedRequest, next);
  }

  handleRequest(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      map(res => {
        return res
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err, request);
      })
    );
  }

  handleError(err: HttpErrorResponse, req: HttpRequest<any>) {
    if(err.status === 401 || err.status === 403) {
      localStorage.clear();
      this.route.navigate(['login']);
    }
    return throwError(() => err);
  }
}

