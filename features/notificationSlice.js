import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    resetNotifications: (state) => {
      state.notifications = []; // Clear notifications on logout
    },
  },
});

export const { addNotification,resetNotifications  } = notificationSlice.actions;
export default notificationSlice.reducer;
