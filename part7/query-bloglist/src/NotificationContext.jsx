import { createContext, useReducer, useContext } from "react";

const initialState = null;

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "CREATE_NOTIFICATION":
			return {
				message: action.payload.message,
				success: action.payload.success,
			};
		case "REMOVE_NOTIFICATION":
			return null;
		default:
			return state;
	}
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	// useReducer needs arguments: 1. Reducer func, 2. initial state. It returns an array with current state and dispatch function
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		initialState
	);

	return (
		// The value provided to the context are: the notification state value and dispatch function returned by useReducer
		<NotificationContext.Provider
			value={{ notification, notificationDispatch }}
		>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	// the useContext function returns the context, an array with the values we saw above
	const notification = useContext(NotificationContext);
	return notification;
};

export const useNotificationDispatch = () => {
	const { notificationDispatch } = useContext(NotificationContext);
	return notificationDispatch;
};

export const setNotification = (dispatch, message, success, timer = 5) => {
	dispatch({
		type: "CREATE_NOTIFICATION",
		payload: { message, success },
	});

	setTimeout(() => {
		dispatch({
			type: "REMOVE_NOTIFICATION",
		});
	}, timer * 1000);
};
export default NotificationContext;
