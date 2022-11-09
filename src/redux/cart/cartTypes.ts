export type CartItemType = {
    type: number,
    size: number,
    id: number,
    price: number,
    title: string,
    imageUrl: string,
    count: number
}

export interface CartSliceState {
    items: CartItemType[],
    totalCount: number;
    totalSum: number;
}