export  type SortItemType = {
    name: string,
    sortProperty: string
}

export interface FilterSliceState {
    currentSort: SortItemType,
    currentCategory: number,
    currentPageNumber: number,
    searchValue: string
}