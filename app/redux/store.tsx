import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { abzApi } from "./features/apiSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [abzApi.reducerPath]: abzApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(abzApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
