import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import codeExecutionReducer from './slices/codeExecutionSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    codeExecution: codeExecutionReducer,
  },
});