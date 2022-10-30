import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
    const {currentCategory, currentSort, currentPageNumber, searchValue} = params
    const category = currentCategory === 0 ? '' : 'category=' + currentCategory
    const sort = 'sortBy=' + (currentSort.sortProperty.replace('-', ''))
    const order = 'order=' + (currentSort.sortProperty.includes('-') ? 'desc' : 'asc')
    const limit = 'limit=' + 4
    const page = 'page=' + currentPageNumber
    const search = 'search=' + searchValue
    const url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items?${page}&${limit}&${category}&${sort}&${order}&${search}`;

    const response = await axios.get(url)
        return response.data
    }
)

const initialState = {
    items: [],
    sizesNames: [26, 30, 40],
    typesNames: ['тонкое', 'традиционное'],
    status: 'pending'
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action) => {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = []
            state.status = 'pending'
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'fulfilled'
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = []
            state.status = 'rejected'
            alert('Ощибка при загрузки пицц')
        }

    }
})


export const {setPizzas} = pizzasSlice.actions

export default pizzasSlice.reducer