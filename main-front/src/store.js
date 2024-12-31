import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";
import authReducer from "./reduxSlice/authSlice";
import registerReducer from "./reduxSlice/registerSlice";
import boardReducer from "./reduxSlice/boardSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer,
    auth: authReducer,
    register: registerReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});

export default store;
