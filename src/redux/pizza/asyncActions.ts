import axios from 'axios';
import { createAsyncThunk} from '@reduxjs/toolkit';
import {SearchPizzaParams, Pizza} from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', 
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://67ee8820c11d5ff4bf79f1be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
});