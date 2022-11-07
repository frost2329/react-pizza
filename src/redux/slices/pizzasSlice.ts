import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";

export type PizzaItemType = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    category: number,
    rating: number,
}
type URLParams = {
    currentCategory: number,
    currentSort: string,
    currentPageNumber: number,
    searchValue: string
}

interface PizzasSliceState {
    items: PizzaItemType[],
    sizesNames: number[],
    typesNames: string[],
    status: 'pending' | 'fulfilled' | 'rejected',
    fullPizza: PizzaItemType
}

export const fetchPizzas = createAsyncThunk<PizzaItemType[], URLParams>('pizzas/fetchPizzas',
    async (params: URLParams) => {
        const {currentCategory, currentSort, currentPageNumber, searchValue} = params
        const category = currentCategory === 0 ? '' : 'category=' + currentCategory
        const sort = 'sortBy=' + (currentSort.replace('-', ''))
        const order = 'order=' + (currentSort.includes('-') ? 'desc' : 'asc')
        const limit = 'limit=' + 4
        const page = 'page=' + currentPageNumber
        const search = 'search=' + searchValue

        const url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items`;
        const urlParams = `?${page}&${limit}&${category}&${sort}&${order}&${search}`

        const {data} = await axios.get<PizzaItemType[]>(url + urlParams)
        return data
    }
)
export const fetchPizzaById = createAsyncThunk<PizzaItemType | {}, string>(
    'pizzas/fetchPizzaById',
    async (id) => {
        if (id) {
            const url = `https://62f53aa6ac59075124ce14b4.mockapi.io/items/${id}`;
            const {data} = await axios.get<PizzaItemType | {}>(url)
            if (data) {
                return data
            }
        }
    }
)

const initialState: PizzasSliceState = {
    items: [],
    sizesNames: [26, 30, 40],
    typesNames: ['тонкое', 'традиционное'],
    status: 'pending',
    fullPizza: {} as PizzaItemType
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state, action: PayloadAction<PizzaItemType[]>) => {
            state.items = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state: PizzasSliceState) => {
            state.items = []
            state.status = 'pending'
        })
        builder.addCase(fetchPizzas.fulfilled, (state: PizzasSliceState, action: PayloadAction<PizzaItemType[]>) => {
            state.items = action.payload
            state.status = 'fulfilled'
        })
        builder.addCase(fetchPizzas.rejected, (state: PizzasSliceState) => {
            state.items = []
            state.status = 'rejected'
            alert('Ощибка при загрузки пицц')
        })
        builder.addCase(fetchPizzaById.pending, (state: PizzasSliceState) => {
            state.fullPizza = {} as PizzaItemType
            state.status = 'pending'
        })
        builder.addCase(fetchPizzaById.fulfilled, (state: PizzasSliceState, action: PayloadAction<PizzaItemType | {}>) => {
            state.fullPizza = action.payload as PizzaItemType
            state.status = 'fulfilled'
        })
        builder.addCase(fetchPizzaById.rejected, (state: PizzasSliceState,) => {
            state.fullPizza = {} as PizzaItemType
            state.status = 'rejected'
            alert('Ощибка при загрузки пицц')
        })
    }
})

export default pizzasSlice.reducer