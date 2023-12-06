import { createSlice } from "@reduxjs/toolkit";
import { PositionResponse, UserResponse } from "./apiSlice";

type UserState = {
  users: UserResponse[];
  nextPage: string | null;
  //positions: PositionResponse[];
};

const initialState: UserState = {
  users: [],
  nextPage: null,
  //positions: [],
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
    // setPositions(state, action) {
    //   state.positions = action.payload;
    // },
  },
});

export const { setUsers, setNextPage, setPositions } = usersSlice.actions;

export default usersSlice.reducer;
