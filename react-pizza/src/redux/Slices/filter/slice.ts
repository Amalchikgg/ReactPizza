import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { FilterSliceState, Sortpopup, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
      name: 'популярности',
      sort: SortPropertyEnum.RATING_DESC,
  }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategotyId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
          state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sortpopup>) {
            state.sort = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
              state.pageCount = Number(action.payload.pageCount);
              state.categoryId = Number(action.payload.categoryId);
              state.sort = action.payload.sort;
            } else {
              state.pageCount = 1;
              state.categoryId = 0;
              state.sort = {
                name: 'популярности',
                sort: SortPropertyEnum.RATING_DESC,
              };
            }
          },
}})

export const { setCategotyId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;