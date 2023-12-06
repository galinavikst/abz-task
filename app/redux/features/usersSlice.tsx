import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "./apiSlice";

type UserState = {
  users: UserResponse[];
  nextPage: string | null;
};

const initialState: UserState = {
  users: [],
  nextPage: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
  },
});

export const { setUsers, setNextPage } = usersSlice.actions;

export default usersSlice.reducer;
