import { Injectable } from "@angular/core";
// import { merge } from "lodash";
import { IServerSideGridRefreshEvent } from "../../component/oraganisms/server-side-grid/IServerSideGridRefreshEvent";
import { EGridFilterType } from "../../component/oraganisms/server-side-grid/serversidegrid.enum";
import { BehaviorSubject } from "rxjs";
import { APP } from "../constants/APP.const";

@Injectable({
    providedIn: 'root'
})

export class CommonHelperService {

  screens = new BehaviorSubject({screenSize: 250, screenType: APP.SCREENS_SIZE.SMALL});

    getGridPayload(gridActionData: IServerSideGridRefreshEvent, OverAllSearch: any, params: any) {
      let filters: any = [];
      if(params && params.toExport) {
          gridActionData = {
              filters: [],
              pageNo: 0,
              pageSize: 10, 
              sort: {
                  sortKey: '',
                  sortType: ''
              }
          }
          OverAllSearch = {value: ''};
      }
      if(gridActionData?.filters.length) {
          gridActionData?.filters.forEach((filterData: any) => {
              let filter = {
                  key: filterData.key,
                  filterOperator: (filterData.columnType == EGridFilterType.STRING)? 'like' : (filterData.operator == '>')? 'gt' : (filterData.operator == '=')? 'eq' : (filterData.operator == '<')? 'lt' : 'in',
                  value: (filterData.columnType == EGridFilterType.STRING)? filterData.searchText : (filterData.columnType == EGridFilterType.NUMBER)? filterData.searchNumber : filterData.searchArray
              }
              filters.push(filter);
          })
      }
      if(OverAllSearch.value) {
          filters.push(OverAllSearch);
      }
      let payload = {
          filters: filters,
          sort: gridActionData?.sort?.sortType? `${gridActionData?.sort?.sortKey},${gridActionData?.sort?.sortType?.toLocaleLowerCase()}` : '',
          pageSize: gridActionData?.pageSize,
          pageNumber: gridActionData?.pageNo
      }
    //   return _.merge(payload, params);
    return Object.assign(payload, params);
    }

    storeItemToSession(key, value, encode=false) {
      if(encode) {
        const encodedVal = btoa(JSON.stringify(value));
        localStorage.setItem(key, encodedVal);
      } else {
        localStorage.setItem(key, value);
      }
    }

    getSessionItem(key, encode=false) {
      if(encode) {
        const encodedVal = localStorage.getItem(key);
        if(encodedVal) {
          const decodedVal = JSON.parse(atob(encodedVal));
          return decodedVal;
        }
        return null
      }
      return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
    }
}