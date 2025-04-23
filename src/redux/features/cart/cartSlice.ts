import { IMedicine } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem extends IMedicine {
  quantity: number;
  prescription?: string | null;
}
interface CartState {
  cart: CartItem[];
}
const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IMedicine>) => {
      const existingProduct = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          prescriptionFile: null,
        });
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.cart.find((i) => i._id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    uploadPrescription: (
      state,
      action: PayloadAction<{ id: string; prescription: string | null }>
    ) => {
      const item = state.cart.find((i) => i._id === action.payload.id);
      if (item) {
        item.prescription = action.payload.prescription;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  uploadPrescription,
  clearCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
