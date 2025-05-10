import { RootState } from "../store";

export const selectFilterCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectFilterCategoryId = (state: RootState ) => state.filter.categoryId;
export const selectFilterSearchValue = (state: RootState) => state.filter.searchValue;
export const selectFilterSortType = (state: RootState) => state.filter.sort.sortProperty;
export const selectSort = (state: RootState) => state.filter.sort;