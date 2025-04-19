import { configureStore } from '@reduxjs/toolkit';
import baseApi from './api/baseApi';
import medicineReducer from './features/productSlice';
// import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    medicines: medicineReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
