import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds user data
  token: null, // Stores authentication token
  isAuthenticated: false, // User authentication status
  loading: false, // Loading state
  error: null, // Error messages
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user; // Store user data
      state.token = action.payload.token; // Store token
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
