import { createSlice } from '@reduxjs/toolkit';
import { IBrandCheckbox } from '@shared/models/product';

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
  prices: [0, 300000],
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
  },
});

export const { setSearchQuery, setProductType, setPrices, setBrandFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
