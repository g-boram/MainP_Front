import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = {
  LOCAL: "http://localhost:8080", // 서버 URL
};

// Thunk: 로그인 API 호출 및 상태 업데이트
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/auth/login`, { email, password });

    // JWT 토큰을 localStorage에 저장
    const token = response.data.token;
    localStorage.setItem("jwtToken", token);

    return response.data; // response.data 반환
  } catch (error) {
    console.error("Login Error :", error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("jwtToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
