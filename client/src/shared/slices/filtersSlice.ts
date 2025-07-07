import { createSlice } from '@reduxjs/toolkit';

import { MAX_PRICE, MIN_PRICE } from '@config/consts';
import { IBrandCheckbox } from '@shared/models/typesbrands';

interface IFiltersState {
  searchQuery: string;
  productType: string;
  brandFilters: string;
  prices: number[];
}

const filtersState: IFiltersState = {
  searchQuery: '',
  productType: '',
  brandFilters: '',
  prices: [MIN_PRICE, MAX_PRICE],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setProductType: (state, action) => {
      state.productType = action.payload;
    },
    setPrices: (state, action) => {
      state.prices = action.payload;
    },
    setBrandFilters: (state, action) => {
      state.brandFilters = action.payload
        .reduce((acc: string[], el: IBrandCheckbox) => {
          if (el.checked) acc.push(el.id);
          return acc;
        }, [] as string[])
        .join(',');
    },
    resetFilters: () => {
      return { ...filtersState };
    },
  },
});

export const {
  setSearchQuery,
  setProductType,
  setPrices,
  setBrandFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
