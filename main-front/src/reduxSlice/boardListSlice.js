import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// ****************************** //
// AsyncThunk로 게시글 데이터 가져오기
// ****************************** //
export const fetchPagedBoards = createAsyncThunk(
  "board/fetchPagedBoards",
  async ({ page = 0, size = 10, sort = "boardId,desc" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${SERVER_URL.LOCAL}/board/paged`, {
        params: { page, size, sort },
      });
      return response.data; // Spring `Page` 객체 반환
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching boards");
    }
  }
);

const boardListSlice = createSlice({
  name: "boardList",
  initialState: {
    boards: [],
    page: 0,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending 상태
      .addCase(fetchPagedBoards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Fulfilled 상태
      .addCase(fetchPagedBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload.content;
        state.page = action.payload.number;
        state.totalPages = action.payload.totalPages;
      })
      // Rejected 상태
      .addCase(fetchPagedBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default boardListSlice.reducer;
