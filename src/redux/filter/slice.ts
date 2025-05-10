import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortPropertyEnum, FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATIMG_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategotyID(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sort.sortProperty = action.payload.sort.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
      //мой кастыль с проверкой на 0, так как категории 0 нет , и при обновлении страницы пиццы не загружаются
      if (Number(action.payload.categoryId) === 0) {
        state.categoryId = NaN;
      } else {
        state.categoryId = Number(action.payload.categoryId);
      }
    },
  },
});

export const { setCategotyID, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
