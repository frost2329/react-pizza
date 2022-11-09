import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {FilterSliceState, SortItemType} from "./filterTypes";



const initialState: FilterSliceState = {
    currentSort: {name: 'популярности +', sortProperty: 'rating'},
    currentCategory: 0,
    currentPageNumber: 1,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSort: (state: FilterSliceState, action: PayloadAction<SortItemType>) => {
            state.currentSort = action.payload;
            state.currentPageNumber = 1
        },
        setCategory: (state: FilterSliceState, action: PayloadAction<number>) => {
            state.currentCategory = action.payload;
            state.currentPageNumber = 1
        },
        setSearch: (state: FilterSliceState, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
            state.currentPageNumber = 1
        },
        setCurrentPageNumber: (state: FilterSliceState, action: PayloadAction<number>) => {
            state.currentPageNumber = action.payload
        },
        setFilters: (state: FilterSliceState, action: PayloadAction<FilterSliceState>) => {
            state.currentSort = action.payload.currentSort
            state.currentPageNumber = Number(action.payload.currentPageNumber)
            state.currentCategory = Number(action.payload.currentCategory)
        }
    }
})

export const {setSort, setCategory, setSearch, setCurrentPageNumber, setFilters} = filterSlice.actions

export default filterSlice.reducer