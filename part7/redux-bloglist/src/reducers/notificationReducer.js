import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return {
        message: action.payload.notification,
        success: action.payload.success,
      };
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, timer, success) => {
  return (dispatch) => {
    dispatch(
      createNotification({
        notification: content,
        success: success,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, timer * 1000);
  };
};

export default notificationSlice.reducer;
