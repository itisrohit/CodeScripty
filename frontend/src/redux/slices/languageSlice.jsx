import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch languages and versions
export const fetchLanguages = createAsyncThunk('language/fetchLanguages', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/code-execution/latest-runtimes`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data.latestRuntimes; 
});

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    selectedLanguage: null,
    additionalData: {
      version: null,
      boilerplate: null,
    },
    languages: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload.language;
      state.additionalData.version = action.payload.additionalData.version;
      state.additionalData.boilerplate = action.payload.additionalData.boilerplate;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSelectedLanguage } = languageSlice.actions;

export default languageSlice.reducer;