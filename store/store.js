import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Import user reducer
import notificationReducer from "../features/notificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice to store
    notifications: notificationReducer,
  },
});

export default store;
