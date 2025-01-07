import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 게시판 수정
export const updateBoard = async (formData) => {
  try {
    const response = await axios.put(`${SERVER_URL.LOCAL}/board`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
