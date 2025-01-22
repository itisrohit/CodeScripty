import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});