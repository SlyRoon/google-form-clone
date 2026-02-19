import { createSlice, } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isLoading: false },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;