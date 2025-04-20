import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderState {
  orders: Product[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (state, action: PayloadAction<Product>) => {
      const existing = state.orders.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.orders.push(action.payload);
      }
    },
    clearOrder: (state) => {
      state.orders = [];
    },
  },
});

export const { addToOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
