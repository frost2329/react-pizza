import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPageNumber: 1,
    currentSort: {name: 'популярности', sortProperty: 'rating'},
    currentCategory: 0,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSort: (state,action) => {state.currentSort = action.payload; state.currentPageNumber = 1},
        setCategory: (state,action) => {state.currentCategory = action.payload; state.currentPageNumber = 1},
        setSearch: (state,action) => {state.searchValue = action.payload; state.currentPageNumber = 1},
        setCurrentPageNumber: (state,action) => {state.currentPageNumber = action.payload}
    }
})

export const { setSort , setCategory, setSearch, setCurrentPageNumber } = filterSlice.actions

export default filterSlice.reducer