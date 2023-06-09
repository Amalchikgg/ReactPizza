import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";
import { Pizza, PizzaSliceState, Status } from "./types";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING, 
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, pageCount } = params
        const { data } = await axios.get(
            `https://6416fd4a205bdf0a1d7d9e3d.mockapi.io/Items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
        return data;
    }   
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;

        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;