import { configureStore } from '@reduxjs/toolkit'
import pizzasReducer from './slices/pizzasSlice'

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
    }
})