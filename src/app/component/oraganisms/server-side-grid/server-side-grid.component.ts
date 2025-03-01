import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDividerModule } from '@angular/material/divider';
import { IServerSideGrid, IServerSideGridColumn } from "./IServerSideGrid";
import { FormControl, FormsModule } from "@angular/forms";
import { MatMenuModule, MatMenuTrigger } from "@angular/material/menu";
import { InputCheckboxComponent } from "../../atoms/input-checkbox/input-checkbox.component";
import { EGridFilterType, RefreshAction, ServerSidegridSortOrder, badgeIconPath, badgeTheme } from "./serversidegrid.enum";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IServerSideGridFilter, IServerSideGridRefreshEvent, IServerSideGridSort } from "./IServerSideGridRefreshEvent";
import { ErrorStateComponent } from "../../atoms/error-state/error-state.component";
import { IEmpty } from "../../atoms/error-state/error-state.interface";
import { EErrorState } from "../../atoms/error-state/error-state.enum";
import { BadgeComponent } from "../../atoms/badge/badge.component";
import { IBadge } from "../../atoms/badge/IBadge";
import { EBadgeType } from "../../atoms/badge/badge-type.enum";
import { EIconAlignment } from "../../atoms/badge/icon-alignment.enum";
import { InputTextComponent } from "../../atoms/input-text/input-text.component";
import { APP } from "../../../utils/constants/APP.const";
import { IFormInputText } from "../../atoms/input-text/input-text.interface";
import { ISOLATION_DASHBOARD_ENGLISH_SOURCE } from "../../../utils/translate/source.l10n";
import { CommonHelperService } from "../../../utils/helpers/common-helper.service";

@Component({
  standalone: true,
  selector: 'app-server-side-grid',
  templateUrl: './server-side-grid.component.html',
  imports: [
    CommonModule,
    MatDividerModule,
    InputTextComponent,
    MatMenuModule,
    InputCheckboxComponent,
    FormsModule,
    MatProgressSpinnerModule,
    ErrorStateComponent,
    BadgeComponent
  ]
})
export class ServerSideGridComponent implements OnChanges, OnInit, OnDestroy {

  /**
   * @description grid configuration to be used when rendering the server-side paginated grid
   */
  @Input()
  config!: IServerSideGrid;

  /**
   * @description reference to the list of filter type - checkbox, string
   */
  GRID_FILTER_TYPE = EGridFilterType;

  /**
   * @description Input reference to show the loader inside the grid if data is in loading state.
   * By default it is false, so that no other data-grid gets affected.
   * If any feature want to show loader inside the data-grid can use this input property.
   */
  @Input()
  isLoading: boolean = false;

  /**
   * @description emit an event when the user clicks next in the Datagrid
   */
  @Output()
  getNextPage = new EventEmitter();

  /**
   * @description emit an event when the user clicks previous in the Datagrid
   */
  @Output()
  getPreviousPage = new EventEmitter();

  @Output()
  getPageSize = new EventEmitter();

  @Output()
  getFilters = new EventEmitter();

  @Output()
  getSelectedRows = new EventEmitter();

  @Output()
  getSortValue = new EventEmitter();

  @Output()
  onGridRefresh = new EventEmitter();

  searchInputConfig: IFormInputText = {
    label: '',
    placeHolderText: 'Type a value',
    iconConfig: '',
    isDisabled: false,
    id: 'Search',
    formControl: new FormControl('')
  }

  filterColumnField: String = '';

  selectedPageSize: number = 10;

  totalPageCount: number = 0;

  actionType = RefreshAction;

  numericFilters = APP.NUMERIC_fILTER_OPTIONS;

  selectedRows: Array<any> = [];

  allRowSelected: boolean = false;

  sortOrderOptions = ServerSidegridSortOrder;

  filterList: Array<IServerSideGridFilter> = [];

  sort!: IServerSideGridSort;

  @ViewChild('numberFilterMenuTrigger') numberFilterMenuTrigger!: MatMenuTrigger;

  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;

  sourceL10 = ISOLATION_DASHBOARD_ENGLISH_SOURCE;

  hasHorizontalScroll = false;

  @Input()
  emptyStateConfig: IEmpty = {
    iconPath: '../../../../assets/icons/flat-book.svg',
    type: EErrorState.TABLE,
    title: ISOLATION_DASHBOARD_ENGLISH_SOURCE.MESSAGES.TABLE_WITHOUT_DATA,
    descriptions: [ISOLATION_DASHBOARD_ENGLISH_SOURCE.MESSAGES.TABLE_WITHOUT_DATA_DESCRIPTION]
  }

  emptyStateWithFilterConfig: IEmpty = {
    iconPath: '../../../../assets/icons/filter-empty.svg',
    type: EErrorState.TABLE,
    title: ISOLATION_DASHBOARD_ENGLISH_SOURCE.MESSAGES.TABLE_WITHOUT_DATA_WITH_FILTERS,
    descriptions: [ISOLATION_DASHBOARD_ENGLISH_SOURCE.MESSAGES.TABLE_WITHOUT_DATA_WITH_FILTERS_DESCRIPTION]
  }

  filterBadgeConfig: Array<IBadge> = [];

  tableData: Array<any> = [];

  disableOverAllCheckBox = false;

  intervalShadow: any;

  currentScreenType = APP.SCREENS_SIZE.SMALL;

  screenSizes = APP.SCREENS_SIZE;

  constructor(private commonService: CommonHelperService) { }

  getFieldValue(field: any, data: any) {
    return data[field];
  }

  filterMenuChange(fieldName: string) {
    this.filterColumnField = fieldName;
  }

  pageSizeChange(size: number) {
    this.selectedPageSize = size;
    this.config.selectedPageSize = size;
    this.totalPageCount = (Math.ceil(this.config.total / this.selectedPageSize) > 0)? Math.ceil(this.config.total / this.selectedPageSize) : 1;
    this.config.pageSize = size;
    this.config.pageNumber = 1;
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: this.config.pageNumber,
      pageSize: this.config.pageSize
    }
    this.getPageSize.emit(refreshData);
  }

  ngOnInit(): void {
    this.intervalShadow = setInterval(() => {
      const div = this.scrollableDiv.nativeElement;
      this.hasHorizontalScroll = div?.scrollWidth > div?.clientWidth;
    }, 1000);
    this.commonService.screens.subscribe({
      next: (resp) => {
        this.currentScreenType = resp.screenType;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && this.config) {
      this.totalPageCount = (Math.ceil(this.config.total / this.selectedPageSize) > 0)? Math.ceil(this.config.total / this.selectedPageSize) : 1;
      this.filterBadgeConfig = this.config.isFiltered? this.filterBadgeConfig : [];
      this.filterList = this.config.isFiltered? this.filterList : [];
      this.selectedPageSize = this.config.selectedPageSize? this.config.selectedPageSize : 10;
      this.config.clearSelectedRows ? this.selectedRows = [] : '';
      if(this.config['uniqueFieldOfData']) {
        this.selectedRows.forEach(row => {
          this.config.data.forEach(tableRow => {
            if(this.config.uniqueFieldOfData && row[this.config.uniqueFieldOfData] === tableRow[this.config.uniqueFieldOfData]) {
              tableRow.checked = true;
            }
          })
        })
      }
      this.tableData = this.config.data || [] ;
      let notDisabledRows = Array.isArray(this.tableData) ? this.tableData?.filter((parent: any) => !parent.disableCheckbox) : [];
      this.allRowSelected = (notDisabledRows.length && notDisabledRows.every((parent: any) => parent.checked)) ? true : false;
      this.disableOverAllCheckBox = (this.tableData?.length && this.tableData.every(row => row.disableCheckbox)) ? true : false;

      setTimeout(() => {
        const div = this.scrollableDiv.nativeElement;
        this.hasHorizontalScroll = div.scrollWidth > div.clientWidth;
      }, 200);
    }
  }

  onNextPage(currentPage: number, action: string) {
    if(currentPage < this.totalPageCount) {
      if (action == RefreshAction.NEXT) {
        this.config.pageNumber = Number(currentPage) + 1;
      } else if (action == RefreshAction.FAST_FORWARD) {
        this.config.pageNumber = Math.ceil(this.config.total / this.config.pageSize);
      }
      let refreshData: IServerSideGridRefreshEvent = {
        filters: this.filterList,
        sort: this.sort,
        pageNo: this.config.pageNumber,
        pageSize: this.config.pageSize
      }
      this.getNextPage.emit(refreshData);
    }
  }

  onPreviousPage(currentPage: number, action: string) {
    if(currentPage > 1) {
      if (action == RefreshAction.BACK) {
        this.config.pageNumber = Number(currentPage) - 1;
      } else if (action == RefreshAction.FAST_BACKWARD) {
        this.config.pageNumber = 1;
      }
      let refreshData: IServerSideGridRefreshEvent = {
        filters: this.filterList,
        sort: this.sort,
        pageNo: this.config.pageNumber,
        pageSize: this.config.pageSize
      }
      this.getPreviousPage.emit(refreshData);
    }
  }

  onFilterTextChange(event: any) {
    if (this.filterList.find(filter => filter.key == event.filterField.filterField)) {
      if (event.value) {
        this.filterList.forEach(filter => {
          if (filter.key == event.filterField.filterField) {
            if (event.filterField.numericFilter) {
              filter.searchNumber = parseInt(event.value);
              filter.operator = event.filterField.numericFilter ? event.filterField.numericFilter.operator : null;
            } else {
              filter.searchText = event.value;
            }
          }
        })
      } else {
        let index = this.filterList.findIndex(filter => filter.key == event.filterField.filterField);
        this.filterList.splice(index, 1);
      }
    } else {
      let filterEvent: IServerSideGridFilter;
      filterEvent = {
        key: event.filterField.filterField,
        columnType: event.filterField.filterType,
        searchText: event.filterField.numericFilter ? null : event.value,
        searchNumber: event.filterField.numericFilter ? parseInt(event.value) : null,
        operator: event.filterField.numericFilter ? event.filterField.numericFilter.operator : null
      }
      this.filterList.push(filterEvent);
    }
    this.getFilterBadgeConfigOnText(event);
    event.filterField.textFilter = event.value;
    this.config.pageNumber = 1;
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: 1,
      pageSize: this.config.pageSize
    }
    this.filterColumnField = '';
    this.config.isFiltered = this.filterList.length? true : false;
    this.getFilters.emit(refreshData);
  }

  onFilterCheckChange(event: any) {
    if (event.value.checked) {
      if (this.filterList.find(filter => filter.key == event.columnFilterField.filterField)) {
        this.filterList.forEach(filter => {
          if (filter.key == event.columnFilterField.filterField) {
            filter.searchArray?.push(event.value.value);
          }
        })
      } else {
        let filterEvent: IServerSideGridFilter;
        filterEvent = {
          key: event.columnFilterField.filterField,
          columnType: event.columnFilterField.filterType,
          searchArray: []
        }
        filterEvent.searchArray?.push(event.value.value);
        this.filterList.push(filterEvent);
      }
      event.columnFilterField.textFilter = event.value;
    } else {
      this.filterList.forEach((filter: any, filterIndex: any) => {
        if (filter.key == event.columnFilterField.filterField) {
          let index: any = filter.searchArray?.findIndex((searchString: any) => searchString == event.value.value);
          if (index >= 0) {
            filter.searchArray?.splice(index, 1);
          }
          event.columnFilterField.textFilter = event.columnFilterField.checkboxFilterOptions.find((option: any) => option.checked);
          if(!filter.searchArray.length)  {
            this.filterList.splice(filterIndex, 1);
          }
        }
      })
    }
    this.getFilterBadgeConfigOnCheck(event);
    this.config.pageNumber = 1;
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: 1,
      pageSize: this.config.pageSize
    }
    this.filterColumnField = '';
    this.config.isFiltered = this.filterList.length? true : false;
    this.getFilters.emit(refreshData);
  }

  changeNumericFilterType(filter: any, column: IServerSideGridColumn) {
    column.numericFilter = filter;
    this.numberFilterMenuTrigger.closeMenu();
    if(column.textFilter) {
      this.onFilterTextChange({filterField: column, value: column.textFilter});
    }
  }

  rowSelectionChange(data: any, event: any) {
    if (event.target.checked) {
      data.checked = true;
      data.data?.forEach((subRow: any) => subRow.checked = true);
      if(!this.selectedRows.find(row => row.id === data.id)) {
        // this.selectedRows.push(_.cloneDeep(data));
        this.selectedRows.push(JSON.parse(JSON.stringify(data)));
      }
      let notDisabledRows = this.tableData.filter((parent: any) => !parent.disableCheckbox);
      this.allRowSelected = (notDisabledRows.length && notDisabledRows.every((parent: any) => parent.checked)) ? true : false;
    } else {
      data.checked = false;
      this.allRowSelected = false;
      data.data?.forEach((subRow: any) => subRow.checked = false);
      let index = this.selectedRows.findIndex(row => row.id == data.id);
        if (index >= 0) {
          this.selectedRows.splice(index, 1);
        }
    }
    this.getSelectedRows.emit(this.selectedRows);
  }

  subRowSelectionChange(data: any, event: any, parentData: any) {
    if (event.target.checked) {
      data.checked = true;
      parentData.checked = parentData.data.every((subRow: any) => subRow.checked);
      if(!this.selectedRows.find(row => row.id === parentData.id)) {
        // this.selectedRows.push(_.cloneDeep(parentData));
        this.selectedRows.push(JSON.parse(JSON.stringify(parentData)));
      } else {
        const subRow = this.selectedRows.find(row => row.id == parentData.id)?.data?.find((subRow: any) => subRow.id === data.id) || {checked: true};
        subRow.checked = true;
      }
      let notDisabledRows = this.tableData.filter((parent: any) => !parent.disableCheckbox);
      this.allRowSelected = (notDisabledRows.length && notDisabledRows.every((parent: any) => parent.checked)) ? true : false;
    } else {
      data.checked = false;
      parentData.checked = false;
      this.allRowSelected = false;
      let isAllUnChecked = parentData.data.every((subRow: any) => !subRow.checked);
      if(isAllUnChecked) {
        let index = this.selectedRows.findIndex(row => row.id == parentData.id);
        if (index >= 0) {
          this.selectedRows.splice(index, 1);
        }
      } else {
        const subRow = this.selectedRows.find(row => row.id == parentData.id)?.data?.find((subRow: any) => subRow.id === data.id) || {checked: true};
        subRow.checked = false;
      }
    }
    this.getSelectedRows.emit(this.selectedRows);
  }

  allRowSelectionChange(event: any) {
    if (event.target.checked) {
      this.allRowSelected = true;
      this.tableData.forEach((row: any) => {
        if (!row.checked && ! row.disableCheckbox) {
          row.checked = true;
          if (row.data) {
            row.data.forEach((subRow: any) => {
              subRow.checked = true;
            })
          }
          if(!this.selectedRows.find(subRow => subRow.id === row.id)) {
            // this.selectedRows.push(_.cloneDeep(row));
            this.selectedRows.push(JSON.parse(JSON.stringify(row)));
          }
        }
      })
    } else {
      this.tableData.forEach((row: any) => {
        row.checked = false;
        if (row.data) {
          row.data.forEach((subRow: any) => {
            subRow.checked = false;
          })
        } 
      })
      this.selectedRows = [];
    }
    this.getSelectedRows.emit(this.selectedRows);
  }

  changeExpand(row: any) {
    row.showSubrow = !row.showSubrow;
  }

  onSort(column: IServerSideGridColumn) {
    this.config.columns.forEach((element: IServerSideGridColumn) => {
      if (element.filterField != column.filterField) {
        element.sortOrder = this.sortOrderOptions.UNSORTED;
      }
    })
    if (column.sortOrder == this.sortOrderOptions.UNSORTED) {
      column.sortOrder = this.sortOrderOptions.ASC;
    } else if (column.sortOrder == this.sortOrderOptions.ASC) {
      column.sortOrder = this.sortOrderOptions.DESC;
    } else if (column.sortOrder == this.sortOrderOptions.DESC) {
      column.sortOrder = this.sortOrderOptions.UNSORTED;
    } else if (!column.sortOrder) {
      column.sortOrder = this.sortOrderOptions.ASC;
    }
    this.sort = {
      sortKey: column.filterField,
      sortType: column.sortOrder
    }
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: this.config.pageNumber,
      pageSize: this.config.pageSize
    }
    this.getSortValue.emit(refreshData);
  }

  selectPageNo(event: any) {
    if (this.config.pageNumber > this.totalPageCount) {
      this.config.pageNumber = this.totalPageCount
    } else if (this.config.pageNumber < 1) {
      this.config.pageNumber = 1;
    }
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: this.config.pageNumber,
      pageSize: this.config.pageSize
    }
    this.onGridRefresh.emit(refreshData);
  }

  getBadgeConfig(field: any, data: any, loader?: boolean) {
    // let configData: string = _.toString(data[field])
    let configData: string = data && data[field] ? JSON.stringify(data[field]) : '';
    let iconPathData: any = badgeIconPath;
    let iconThemeData: any = badgeTheme;
    let badgeConfig: IBadge = {
      id: configData,
      iconPath: iconPathData[configData.toUpperCase().replace(' ', '_')],
      type: iconThemeData[configData.toUpperCase().replace(' ', '_')],
      customClass: iconThemeData[configData.toUpperCase().replace(' ', '_')]? '' : (data[field] == '') ? '' : 'badgeRight',
      content: {
        content: configData? configData : '-',
      },
      iconAlignment: EIconAlignment.LEFT,
    };
    if(loader && !configData) {
      return null;
    }
    return badgeConfig;
  }

  getFilterBadgeConfigOnText(event: any) {
    if(event.value) {
      let existingBadge = this.filterBadgeConfig.find(badge => badge.id == event.filterField.field);
      if(existingBadge) {
        existingBadge.content.value = event.value;
        if(event.filterField.filterType == EGridFilterType.NUMBER) {
          existingBadge.content.content = `${event.filterField.label} ${event.filterField.numericFilter.label}:`
        }
      } else {
        let badgeConfig: IBadge = {
          type: EBadgeType.SECONDARY,
          customClass: `${EBadgeType.SECONDARY} filtered-value`,
          content: {
            content: `${event.filterField.label} ${(event.filterField.filterType == EGridFilterType.STRING)? 'Contains' : (event.filterField.filterType == EGridFilterType.NUMBER)? event.filterField.numericFilter.label : ''}:`,
            value: `${event.value}`
          },
          iconPath: '../../../../assets/icons/cancel-grey.svg',
          iconAlignment: EIconAlignment.RIGHT,
          id: event.filterField.field,
          isIconActionable: true
        }
        this.filterBadgeConfig.push(badgeConfig);
      }
    } else {
      let existingBadgeIndex = this.filterBadgeConfig.findIndex(badge => badge.id == event.filterField.field);
      if(existingBadgeIndex >= 0) {
        this.filterBadgeConfig.splice(existingBadgeIndex, 1);
      }
    }
  }

  getFilterBadgeConfigOnCheck(event: any) {
    if(event.value.checked) {
      let existingBadge = this.filterBadgeConfig.find(badge => badge.id == event.columnFilterField.field);
      if(existingBadge) {
        existingBadge.content.value = `${existingBadge.content.value}, ${event.value.label}`;
      } else {
        let badgeConfig: IBadge = {
          type: EBadgeType.SECONDARY,
          customClass: `${EBadgeType.SECONDARY} filtered-value`,
          content: {
            content: `${event.columnFilterField.label} ${this.sourceL10.LABELS.IS}:`,
            value: `${event.value.label}`
          },
          iconPath: '../../../../assets/icons/cancel-grey.svg',
          iconAlignment: EIconAlignment.RIGHT,
          id: event.columnFilterField.field,
          isIconActionable: true
        }
        this.filterBadgeConfig.push(badgeConfig);
      }
    } else {
      let existingBadge = this.filterBadgeConfig.find(badge => badge.id == event.columnFilterField.field);
      let selectedFilters = event.columnFilterField.checkboxFilterOptions.filter((filterData: any) => filterData.checked);
      if(selectedFilters.length && existingBadge) {
        let valueString: string = '';
        selectedFilters.forEach((filter: any) => {
          valueString = valueString? `${valueString}, ${filter.label}` : `${filter.label}`;
        })
        existingBadge.content.value = valueString;
      } else {
        let existingBadgeIndex = this.filterBadgeConfig.findIndex(badge => badge.id == event.columnFilterField.field);
        this.filterBadgeConfig.splice(existingBadgeIndex, 1);
      }
    }
  }

  removeFilter(event: any) {
    this.filterList.splice(this.filterList.findIndex(list => list.key == event.id), 1);
    let filterColumn = this.config.columns.find(column => column.field == event.id);
    if(filterColumn) {
      filterColumn.textFilter = '';
      filterColumn.checkboxFilterOptions?.forEach(filter => {
        filter.checked = false;
      })
    }
    let refreshData: IServerSideGridRefreshEvent = {
      filters: this.filterList,
      sort: this.sort,
      pageNo: 1,
      pageSize: this.config.pageSize
    }
    this.config.isFiltered = this.filterList.length? true : false;
    this.getFilters.emit(refreshData);
    this.filterBadgeConfig.splice(this.filterBadgeConfig.findIndex(badge => badge.id == event.id), 1);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalShadow);
  }
}