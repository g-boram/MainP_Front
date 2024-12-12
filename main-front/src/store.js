import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer, // 여러 슬라이스를 등록할 수 있음
  },
});

export default store;
