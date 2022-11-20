import { configureStore } from '@reduxjs/toolkit'
import pizzasReducer from './pizza/pizzasSlice'
import filterReducer from './filter/filterSlice'
import cartSlice from './cart/cartSlice'
import {useDispatch} from "react-redux";
import ordersSlice from "./orders/ordersSlice";

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        cart: cartSlice,
        orders: ordersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();