export interface IServerSideGridRefreshEvent {
    sort: IServerSideGridSort;
    filters: IServerSideGridFilter[];
    pageSize: number;
    pageNo: number;
}

export interface IServerSideGridSort {
    sortKey?: string;
    sortType?: string;
}

export interface IServerSideGridFilter {
    key: String,
    columnType: string,
    searchText?: string,
    searchArray?: Array<string>,
    searchNumber?: Number | null,
    operator?: String
}