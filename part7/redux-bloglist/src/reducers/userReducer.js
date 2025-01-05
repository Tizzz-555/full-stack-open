import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const validateUser = (userCreds) => {
  // return a function that accepts dispatch (from Redux thunk middleware) so we can dispatch actions
  return async (dispatch) => {
    try {
      const authorizedUser = await loginService.login(userCreds);
      dispatch(setUser(authorizedUser));
      return { success: true, user: authorizedUser };
    } catch (error) {
      return {
        success: false,
        error: "Wrong username or password",
      };
    }
  };
};
export default userSlice.reducer;
