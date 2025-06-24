import { configureStore } from '@reduxjs/toolkit';
import coinsReducer from './slices/coinSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    user: userReducer
  },
});

// Types for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
