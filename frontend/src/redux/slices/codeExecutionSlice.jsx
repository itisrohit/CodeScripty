import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to run code
export const runCode = createAsyncThunk('codeExecution/runCode', async ({ language, version, code, stdin }) => {
  const response = await axios.post('http://localhost:8080/api/v1/code-execution/run', {
    language,
    version,
    code,
    stdin,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response.data;
  // console.log(response.data.stdout);

});




export const codeExecutionSlice = createSlice({
  name: 'codeExecution',
  initialState: {
    output: null,
    status: 'idle',
    error: null,
    boilerplate: '', // Ensure boilerplate is initialized
  },
  reducers: {
    setBoilerplate: (state, action) => {
      state.boilerplate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.output = action.payload.stdout;
      

      })
      .addCase(runCode.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setBoilerplate } = codeExecutionSlice.actions;

export default codeExecutionSlice.reducer;