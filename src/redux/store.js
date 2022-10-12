import { configureStore } from '@reduxjs/toolkit'
import pizzasReducer from './slices/pizzasSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
    }
})