import axios from "axios";
import { SERVER_URL } from "../constants/urlList";
import { fetchPagedBoards } from "../reduxSlice/boardListSlice";

// 신청서 전부 조회
export const getAllCarSellList = async () => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/api/carsell`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 삭제
export const deleteBoard = async (boardId, dispatch) => {
  try {
    const response = await axios.delete(`${SERVER_URL.LOCAL}/board/${boardId}`);
    dispatch(fetchPagedBoards({ page: 0, size: 10 }));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 삭제
export const detailBoardById = async (boardId) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/board/${boardId}`);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 게시판 수정내역 조회
export const getUpdatedBoardHistory = async (boardId) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/board/history/${boardId}`);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
