import { createSlice } from "@reduxjs/toolkit";
import { PositionResponse } from "./apiSlice";

type InputGroup = {
  email: string;
  name: string;
  phone: string;
  [key: string]: string;
};

type FormState = {
  inputGroup: InputGroup;
  position: PositionResponse;
  photo: any;
  token: string | null;
};

const initialState: FormState = {
  inputGroup: {
    email: "",
    name: "",
    phone: "",
  },
  position: { name: "Lawyer", id: 1 },
  photo: null,
  token: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setInputGroup(state, action) {
      state.inputGroup = action.payload;
    },
    setPhoto(state, action) {
      state.photo = action.payload;
    },
    setPosition(state, action) {
      state.position = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setInputGroup, setPhoto, setPosition, setToken } =
  formSlice.actions;

export default formSlice.reducer;
