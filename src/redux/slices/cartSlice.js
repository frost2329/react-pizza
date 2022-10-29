import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalCount: 0,
    totalSum: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            debugger;
            const findItem = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...action.payload, count: 1})
            }
            state.totalCount++
            state.totalSum = state.totalSum + action.payload.price
        },
        plusItem: (state, action) => {
            const findItemPlus = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItemPlus) {
                findItemPlus.count++;
                state.totalCount++;
                state.totalSum = state.totalSum + action.payload.price;
            }
        },
        minusItem: (state, action) => {
            const findItemMinus = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItemMinus) {
                findItemMinus.count--;
                state.totalCount--;
                state.totalSum = state.totalSum - action.payload.price;
                if (findItemMinus.count <= 0) {
                    state.items = state.items.filter(item => item.id !== action.payload.id ||
                        item.type !== action.payload.type || item.size !== action.payload.size)
                }
            }
        },
        removeItem: (state, action) => {
            const findItemRemove = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItemRemove) {
                state.items = state.items.filter(item => item.id !== action.payload.id ||
                              item.type !== action.payload.type || item.size !== action.payload.size)
                state.totalSum = state.totalSum - (findItemRemove.count * findItemRemove.price)
                state.totalCount = state.totalCount - findItemRemove.count
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalSum = 0;
        },
    }
})

export const {addItemToCart, plusItem, minusItem, removeItem, clearCart} = cartSlice.actions

export default cartSlice.reducer