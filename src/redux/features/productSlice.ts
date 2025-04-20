import { MedicineCategory, MedicineType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilter {
  searchTerm?: string;
  tags?: string[];
  symptoms?: string[];
  inStock?: boolean | 'all';
  requiredPrescription?: boolean | 'all';
  price: [number, number];
  type?: MedicineType | '';
  categories?: MedicineCategory[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc' | '';
  page?: number;
  limit?: number;
}

export interface IInitialState {
  search: string;
  filters: IFilter;
}

const initialState: IInitialState = {
  search: '',
  filters: {
    searchTerm: '',
    tags: [],
    symptoms: [],
    inStock: 'all',
    requiredPrescription: 'all',
    price: [0, 1000],
    type: '',
    categories: [],
    sortBy: '',
    sortOrder: '',
    page: 1,
    limit: 10,
  },
};

const productSlice = createSlice({
  name: 'medicines',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.filters.searchTerm = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<IFilter>>) => {
      state.filters = { ...state.filters, ...action.payload };

      if (action.payload.searchTerm !== undefined) {
        state.search = action.payload.searchTerm;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.search = '';
    },
  },
});

export const { setSearch, setFilters, resetFilters } = productSlice.actions;

export default productSlice.reducer;
