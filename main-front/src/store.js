import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";
import authReducer from "./reduxSlice/authSlice";
import registerReducer from "./reduxSlice/registerSlice";
import boardCreateReducer from "./reduxSlice/boardCreateSlice";
import boardListReducer from "./reduxSlice/boardListSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer,
    auth: authReducer,
    register: registerReducer,
    boardCreate: boardCreateReducer,
    boardList: boardListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [], // Add specific action types here if necessary
        ignoredPaths: ["board.file"], // Example path to ignore
      },
    }),
});

export default store;
