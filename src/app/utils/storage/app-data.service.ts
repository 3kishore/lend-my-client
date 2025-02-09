import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private _theme = new BehaviorSubject<any>('');

  private _appLoader = new BehaviorSubject<any>(false);

  theme = this._theme.asObservable();

  appLoader = this._appLoader.asObservable();

  updatetheme(data: string) {
    this._theme.next(data);
  }

  updateAppLoader(data: boolean) {
    this._appLoader.next(data);
  }
}
