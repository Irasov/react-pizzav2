import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategotyID(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort.sortProperty = action.payload.sort.sortProperty;
      state.currentPage = Number(action.payload.currentPage);
      //мой кастыль с проверкой на 0, так как категории 0 нет , и при обновлении страницы пиццы не загружаются
      if (Number(action.payload.categoryId) === 0) {
        state.categoryId = 'NaN';
      } else {
        state.categoryId = Number(action.payload.categoryId);
      }
    },
  },
});

export const selectFilterCurrentPage = (state) => state.filter.currentPage;
export const selectFilterCategoryId = (state) => state.filter.categoryId;
export const selectFilterSearchValue = (state) => state.filter.searchValue;
export const selectFilterSortType = (state) => state.filter.sort.sortProperty;
export const selectSort = (state) => state.filter.sort;

export const { setCategotyID, setSort, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
