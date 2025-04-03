import { createSlice } from "@reduxjs/toolkit";

const mailCountSlice = createSlice({
  name: "mailCount",
  initialState: {
    data: null, // Store mail count data
  },
  reducers: {
    setMailCount: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Export action to update mail count
export const { setMailCount } = mailCountSlice.actions;

// Export reducer for store configuration
export default mailCountSlice.reducer;
