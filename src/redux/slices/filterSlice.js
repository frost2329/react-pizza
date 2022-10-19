import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentSort: {name: 'популярности +', sortProperty: 'rating'},
    currentCategory: 0,
    currentPageNumber: 1,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSort: (state,action) => {state.currentSort = action.payload; state.currentPageNumber = 1},
        setCategory: (state,action) => {state.currentCategory = action.payload; state.currentPageNumber = 1},
        setSearch: (state,action) => {state.searchValue = action.payload; state.currentPageNumber = 1},
        setCurrentPageNumber: (state,action) => {state.currentPageNumber = action.payload},
        setFilters: (state, action) =>{
            state.currentSort = action.payload.currentSort
            state.currentPageNumber = Number(action.payload.currentPageNumber)
            state.currentCategory = Number(action.payload.currentCategory)
        }
    }
})

export const { setSort , setCategory, setSearch, setCurrentPageNumber, setFilters } = filterSlice.actions

export default filterSlice.reducer