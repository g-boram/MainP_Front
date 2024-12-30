import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";
import authReducer from "./reduxSlice/authSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
