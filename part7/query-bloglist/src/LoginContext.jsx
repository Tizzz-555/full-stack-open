import { createContext, useReducer, useContext } from "react";

const initialState = null;

const userReducer = (state, action) => {
	switch (action.type) {
		case "LOGGED-IN":
			return action.payload;
		case "LOGGED-OUT":
			return null;
		default:
			return state;
	}
};

const LoginContext = createContext();

export const LoginContextProvider = (props) => {
	const [user, userDispatch] = useReducer(userReducer, initialState);

	return (
		<LoginContext.Provider value={{ user, userDispatch }}>
			{props.children}
		</LoginContext.Provider>
	);
};

export const useUserValue = () => {
	const { user } = useContext(LoginContext);
	return user;
};

export const useUserDispatch = () => {
	const { userDispatch } = useContext(LoginContext);
	return userDispatch;
};

export default LoginContext;
