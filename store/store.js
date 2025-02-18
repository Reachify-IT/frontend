import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Import user reducer

const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice to store
  },
});

export default store;
