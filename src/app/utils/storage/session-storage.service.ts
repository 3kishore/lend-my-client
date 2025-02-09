import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  setItem(
    key: string,
    value: any,
    stringifyTheValue: boolean = false
  ) {
      window.localStorage.setItem(
          key,
          stringifyTheValue ? JSON.stringify(value) : value
      )
  }

  getItem(key: string, parseValue: boolean = false): any {
      let storedItem = window.localStorage.getItem(key);
      return  (storedItem && parseValue)? JSON.parse(storedItem) : storedItem;
  }

  enCodeAndSetItem(
      key: string,
      value: any,
      stringifyTheValue: boolean = false,
  ) {
      window.localStorage.setItem(
          key,
          stringifyTheValue ? btoa(JSON.stringify(value)) : btoa(value)
      )
  }

  deCodeAndGetItem(key: string, parseValue: boolean = false): any {
      let storedItem = window.localStorage.getItem(key) || '';
      return  (storedItem && parseValue)? JSON.parse(atob(storedItem)) : atob(storedItem);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
