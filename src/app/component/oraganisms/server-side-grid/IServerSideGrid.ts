import { TemplateRef } from "@angular/core";
import { EGridFilterType, ServerSidegridSortOrder } from "./serversidegrid.enum";

export interface IServerSideGrid {
   /**
   * @description an array of columns of the form IGridColumn that the grid displays
   */
  columns: Array<IServerSideGridColumn>;

  /**
   * @description data to be displayed in the grid
   *              include `isDisabled` property in the object to disable row selection
   */
  data: Array<any>;

  /**
   * @description numb of rows to render per page
   */
  pageSize: number;

  /**
   * @description rendered page number
   */
  pageNumber: number;

  /**
   * @description total count of records, this is used to show the correct count in the Datagrid footer
   */
  total: number;

  /**
   * @description set the options for page size dropdown
   */
  pageSizeOptionsConfig: IGridPageSizeOptions;

  /**
   * @description set the table content for empty states
   */
  isFiltered: boolean;


  /**
   * @description set the table subheader
   */
  subHeader?: object;


  /**
   * @description set the table row checkbox
   */
  isSelectable: boolean;

  selectedPageSize?: number

  /**
   * @description set uniquie field of data object
   */
  uniqueFieldOfData?: string;

  /**
   * @description If you want to uncheck the selected items after the data table update
   */
  clearSelectedRows?: boolean;

  expandableRows?: boolean;
}

export interface IServerSideGridColumn {
  /**
   * @description column label
   */
  label: string;

  /**
   * @description property name in the object that the column is bound to
   */
  field: string;

  /**
   * @description property name in the object that the column is bound to
   */
  subHeaderfield?: string;

  /**
   * @description property name in the object that the column is bound to
   */
  subRowField?: string;

  /**
   * @description a boolean value on the column to indicate if the column can be sorted
   */
  isSortable?: boolean;

  /**
   * @description an ENUM ServerSidegridSortOrder to decided whether the column is sorted in Ascending or Descending order
   */
  sortOrder?: ServerSidegridSortOrder;

  /**
   * @description hides the filter for column
   */
  hideFilter?: boolean;

  /**
   * @description a list of <key, value> objects listing the options to show in the filter
   */
  checkboxFilterOptions?: Array<{ key: string; value: string; label: string; checked: boolean }>;

  /**
   * @description field in the object to use to filter out the elements in the grid
   */
  filterField?: string;

  /**
   * @description type of filter to use - checkbox, string
   */
  filterType?: EGridFilterType;

  /**
   * @description set numeric filter value
   */
  numericFilter?: object;

  /**
   * @description set text filter value
   */
  textFilter?: String;

  /**
   * @description set column as a row specifier
   */
  rowSpecifier?: boolean;

  /**
   * @description Add custom class to the column
   */
  customClass?: string;

  /**
   * @description set the coulumn values hyperlink
   */
   isContentBadge?: boolean;

  /**
   * @description optional cellTemplate for cell rendering
   */
  cellTemplate?: TemplateRef<any>; // custom cell renderer template

  /**
   * @description optional cellTemplate for sub header cell rendering
   */
  subHeadercellTemplate?: TemplateRef<any>; // custom sub header cell renderer template

  /**
   * @description optional cellTemplate for sub header cell rendering
   */
  subRowcellTemplate?: TemplateRef<any>; // custom sub header cell renderer template

  loader?: boolean;
  
}

export interface IGridPageSizeOptions {
  sizeOptions: Array<number>;
  optionLabel?: string;
}