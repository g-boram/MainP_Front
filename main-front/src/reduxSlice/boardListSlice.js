import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// ****************************** //
// AsyncThunk로 게시글 데이터 가져오기
// ****************************** //
export const fetchPagedBoards = createAsyncThunk(
  "board/fetchPagedBoards",
  async ({ page = 0, size = 1, sort = "boardId,desc" }, { rejectWithValue }) => {
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
    boards: [], // 통신된 데이터 값 상태
    activeBoards: [], // 활성화 상태의 게시글
    categoryBoards: [], // 카테고리별 게시글
    filteredBoards: [], // 관리자페이지에서 사용하는 활성화 상태값 분류 데이터
    page: 0,
    totalPages: 0,
    filterTotalPages: 0,
    isLoading: false,
    error: null,
    category: "notice",
    statusFilter: "ALL",
  },
  reducers: {
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;

      // 상태 변경 시 필터 적용
      state.filteredBoards = state.boards.filter((board) => {
        if (action.payload === "ALL") return true;
        if (action.payload === "활성화") return board.status === "ACTIVE";
        if (action.payload === "비활성화") return board.status === "INACTIVE";
        return true;
      });

      state.filterTotalPages = Math.ceil(state.filteredBoards.length / 10);
    },
    setActiveBoard: (state, action) => {
      state.filterTotalPages = Math.ceil(state.activeBoards.length / 10);
    },
    setCategoryBoard: (state, action) => {
      state.isLoading = true;
      state.categoryBoards = state.activeBoards.filter((board) => {
        if (action.payload === "notice") return board.category === "notice";
        if (action.payload === "event") return board.category === "event";
        if (action.payload === "other") return board.category === "other";
        return true;
      });

      state.filterTotalPages = Math.ceil(state.categoryBoards.length / 10);
      state.isLoading = false;
    },
  },
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
        state.boards = action.payload.content || [];
        state.activeBoards = action.payload.content.filter((item) => item.status === "ACTIVE") || [];
        state.page = action.payload.number ?? 0;
        state.totalPages = action.payload.totalPages;
        state.filterTotalPages = action.payload.totalPages;

        // 데이터 로드 후 현재 필터 적용
        state.filteredBoards = state.boards.filter((board) => {
          if (state.statusFilter === "ALL") return true;
          if (state.statusFilter === "활성화") return board.status === "ACTIVE";
          if (state.statusFilter === "비활성화") return board.status === "INACTIVE";
          return true;
        });
      })
      // Rejected 상태
      .addCase(fetchPagedBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setStatusFilter, setActiveBoard, setCategoryBoard } = boardListSlice.actions;
export default boardListSlice.reducer;
