import { createSlice } from "@reduxjs/toolkit";
import { PositionResponse } from "./apiSlice";

type InputGroup = {
  email: string;
  name: string;
  phone: string;
  [key: string]: string;
};

type InputStatuses = {
  email: boolean;
  name: boolean;
  phone: boolean;
  photo: boolean;
};

type FormState = {
  inputGroup: InputGroup;
  position: PositionResponse;
  photo: any;
  token: string | null;
  validStatuses: InputStatuses;
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
  validStatuses: {
    email: false,
    name: false,
    phone: false,
    photo: false,
  },
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
    setValidStatuses(state, action) {
      const { input, isValid } = action.payload;
      state.validStatuses = { ...state.validStatuses, [input]: isValid };
    },
  },
});

export const {
  setInputGroup,
  setPhoto,
  setPosition,
  setToken,
  setValidStatuses,
} = formSlice.actions;

export default formSlice.reducer;
