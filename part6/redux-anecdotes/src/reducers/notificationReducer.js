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

export const { createNotification, removeNotification } =
	notificationSlice.actions;

export const setNotification = (content, timer) => {
	return (dispatch) => {
		dispatch(createNotification(content));
		setTimeout(() => {
			dispatch(removeNotification());
		}, timer * 1000);
	};
};
export default notificationSlice.reducer;
