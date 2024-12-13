import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";
import countReducer from "./reduxSlice/countSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer, // 여러 슬라이스를 등록할 수 있음
    countSlice: countReducer,
  },
});

export default store;
