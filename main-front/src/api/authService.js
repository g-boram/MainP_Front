// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const SERVER_URL = {
//   LOCAL: "http://localhost:8080", // 서버 URL을 환경에 맞게 설정하세요.
// };

// // 회원가입
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${SERVER_URL.LOCAL}/auth/register`, userData);
//     return response.data; // 필요에 따라 반환 데이터를 조정하세요.
//   } catch (error) {
//     console.error("Register Error :", error);
//     throw error; // 에러는 호출한 쪽에서 처리합니다.
//   }
// };

// 로그인
// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post(`${SERVER_URL.LOCAL}/auth/login`, { email, password });

//     const token = response.data.token;

//     // JWT 토큰을 localStorage에 저장
//     localStorage.setItem("jwtToken", token);

//     return response.data;
//   } catch (error) {
//     console.error("Login Error :", error);
//     throw error;
//   }
// };
// export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post("http://localhost:8080/login", { email, password });
//     return response.data; // 서버의 응답 데이터 반환
//   } catch (error) {
//     return rejectWithValue(error.response.data || error.message);
//   }
// });
