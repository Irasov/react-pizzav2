import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setCategotyID, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
