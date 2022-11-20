import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {CartItemType, CartSliceState} from "../cart/cartTypes";
import axios from "axios";

export type OrdersItem = {
    id: string,
    items: CartItemType,
    totalSum: number,
    totalCount: number
}
const baseOrdersUrl: string = 'https://62f53aa6ac59075124ce14b4.mockapi.io/orders';

export interface OrdersSliceState {
    orders: OrdersItem[],
}

export const fetchOrders = createAsyncThunk<OrdersItem[], void>('order/fetchOrders',
    async () => {
        const response: any = await axios.get<OrdersItem[]>(baseOrdersUrl)
        return response.data
    }
)
export const postOrder = createAsyncThunk<OrdersItem, CartSliceState>('order/postOrder',
    async (order: CartSliceState) => {
        const response: any = await axios
            .post(baseOrdersUrl,
                {items: order.items, totalSum: order.totalSum, totalCount: order.totalCount})
        console.log(response)
        return response.data
    }
)

const initialState: OrdersSliceState = {
    orders: []
}

export const ordersSlice = createSlice({
        name: 'orders',
        initialState: initialState,
        reducers: {
            addItemToOrders: (state: OrdersSliceState, action: PayloadAction<OrdersItem[]>) => {
                state.orders = action.payload.reverse()
                console.log(state)
            },
        },
        extraReducers: (builder) => {
            builder.addCase(postOrder.fulfilled, (state: OrdersSliceState, action: PayloadAction<OrdersItem>) => {
                state.orders.push(action.payload)
            })
            builder.addCase(postOrder.rejected, (state: OrdersSliceState) => {
                state.orders = []
                alert('Ощибка при загрузки заказов')
            })
            builder.addCase(fetchOrders.fulfilled, (state: OrdersSliceState, action: PayloadAction<OrdersItem[]>) => {
                state.orders = action.payload.reverse()
            })
            builder.addCase(fetchOrders.rejected, (state: OrdersSliceState) => {
                state.orders = []
                alert('Ощибка при загрузки заказов')
            })

        }

    }
)

export const {addItemToOrders} = ordersSlice.actions

export default ordersSlice.reducer