import { createSlice } from "@reduxjs/toolkit";

// Retrieve stored user data and token from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = localStorage.getItem("accessToken") || null;

const initialState = {
  user: storedUser, // Load user from storage
  accessToken: storedToken, // Load token from storage
  isAuthenticated: !!storedToken, // User is authenticated if token exists
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

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;

      // Clear localStorage on failure
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage on logout
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
