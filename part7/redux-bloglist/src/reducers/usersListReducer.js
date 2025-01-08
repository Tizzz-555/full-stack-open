import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      console.log(state);
      console.log(action.payload);
      return action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    console.log(users);
    dispatch(setUsers(users));
  };
};
export default usersSlice.reducer;
