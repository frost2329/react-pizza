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
export type URLParams = {
    currentCategory: number,
    currentSort: string,
    currentPageNumber: number,
    searchValue: string
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'

}

export interface PizzasSliceState {
    items: PizzaItemType[],
    sizesNames: number[],
    typesNames: string[],
    status: Status
    fullPizza: PizzaItemType
}