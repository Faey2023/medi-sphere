import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import medicineReducer from './features/productSlice';
import authReducer from './auth/authSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import baseApi from './api/baseApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'auth'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  medicines: medicineReducer,
  auth: authReducer, // ✅ now 'auth' will be available in RootState
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
