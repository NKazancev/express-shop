import { createSlice } from '@reduxjs/toolkit';

import { MAX_PRICE, MIN_PRICE } from '@config/consts';
import { IBrandCheckbox, IProductType } from '@shared/models/typesbrands';

const productType = JSON.parse(localStorage.getItem('productType') || '{}');
const prices = JSON.parse(localStorage.getItem('prices') || '[]');
const brandCheckboxes = JSON.parse(localStorage.getItem('checkboxes') || '[]');
const brandFilters = localStorage.getItem('brands') || '';

interface IFiltersState {
  searchQuery: string;
  productType: IProductType;
  brandCheckboxes: IBrandCheckbox[];
  brandFilters: string;
  prices: number[];
}

const filtersState: IFiltersState = {
  searchQuery: '',
  productType,
  brandCheckboxes,
  brandFilters,
  prices: !prices.length ? [MIN_PRICE, MAX_PRICE] : prices,
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
      state.brandFilters = action.payload;
    },
    resetFilters: () => {
      return {
        searchQuery: '',
        brandCheckboxes: [],
        brandFilters: '',
        productType: { id: '', name: '' },
        prices: [MIN_PRICE, MAX_PRICE],
      };
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
