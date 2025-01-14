import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 특정 사용자 조회
export const getSimpleUser = async (id) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/users/${id}`);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
