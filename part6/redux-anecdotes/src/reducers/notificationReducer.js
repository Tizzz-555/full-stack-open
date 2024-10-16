import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		createNotification(state, action) {
			return action.payload;
		},
		removeNotification(state, action) {
			return "";
		},
	},
});
export const { createNotification, voteNotification, removeNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;
