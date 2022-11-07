import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type CartItemType = {
    type: number,
    size: number,
    id: number,
    price: number,
    title: string,
    imageUrl: string,
    count: number
}

interface CartSliceState {
    items: CartItemType[],
    totalCount: number;
    totalSum: number;
}

const initialState: CartSliceState = {
    items: [],
    totalCount: 0,
    totalSum: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state: CartSliceState, action: PayloadAction<CartItemType>) => {
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
        plusItem: (state: CartSliceState, action: PayloadAction<CartItemType>) => {
            const findItemPlus = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItemPlus) {
                findItemPlus.count++;
                state.totalCount++;
                state.totalSum = state.totalSum + action.payload.price;
            }
        },
        minusItem: (state: CartSliceState, action: PayloadAction<CartItemType>) => {
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
        removeItem: (state: CartSliceState, action: PayloadAction<CartItemType>) => {
            const findItemRemove = state.items.find(item => item.id === action.payload.id &&
                item.type === action.payload.type && item.size === action.payload.size)
            if (findItemRemove) {
                state.items = state.items.filter(item => item.id !== action.payload.id ||
                    item.type !== action.payload.type || item.size !== action.payload.size)
                state.totalSum = state.totalSum - (findItemRemove.count * findItemRemove.price)
                state.totalCount = state.totalCount - findItemRemove.count
            }
        },
        clearCart: (state: CartSliceState) => {
            state.items = [];
            state.totalCount = 0;
            state.totalSum = 0;
        },
    }
})

export const {addItemToCart, plusItem, minusItem, removeItem, clearCart} = cartSlice.actions

export default cartSlice.reducer