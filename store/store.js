import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice"; // Import user reducer
import notificationReducer from "../features/notificationSlice";
import mailCountReducer from "../features/mailCountSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice to store
    notifications: notificationReducer,
    mailCount: mailCountReducer,
  },
});

export default store;
