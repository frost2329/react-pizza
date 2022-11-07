import { RootState } from '../store';

export const selectPizzaData = (state: RootState) => state.pizzas;
export const selectCartData = (state: RootState) => state.cart;
export const selectFilterData = (state: RootState) => state.filter;