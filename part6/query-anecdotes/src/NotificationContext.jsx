import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
	console.log(state);
	console.log(action.payload);
	return action.payload;
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
	// useReducer needs arguments: 1. Reducer func, 2. initial state. It returns an array with current state and dispatch function
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

	return (
		// The value provided to the context are: the notification state value and dispatch function returned by useReducer
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	);
};

export const useNotificationValue = () => {
	// the useContext function returns the context, an array with the values we saw above
	const notificationAndDispatch = useContext(NotificationContext);
	return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(NotificationContext);
	return notificationAndDispatch[1];
};

export default NotificationContext;
