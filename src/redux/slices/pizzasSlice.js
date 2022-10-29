import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    sizesNames: [26, 30, 40],
    typesNames: ['тонкое', 'традиционное']
}

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setPizzas: (state,action) => {state.items = action.payload}
    }
})

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer