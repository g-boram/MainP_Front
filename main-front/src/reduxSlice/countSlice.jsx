import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
};

const countSlice = createSlice({
  name: "countSlice", // slice 이름
  initialState, // 초기 상태
  reducers: {
    // 리듀서 함수
    countPlus: (state, action) => {
      state.number += action.payload;
    },
    countChange: (state, action) => {
      state.number = action.payload;
    },
  },
});

// 액션과 리듀서 내보내기
export const { countPlus, countChange } = countSlice.actions;
export default countSlice.reducer;
