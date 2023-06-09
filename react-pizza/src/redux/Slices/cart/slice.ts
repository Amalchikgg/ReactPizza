import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if(findItem) {
                findItem.count++;   
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if(findItem) {
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum; 
            }, 0)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum; 
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    }
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;