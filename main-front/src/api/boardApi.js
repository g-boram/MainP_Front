import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

export const createBoard = async (formTotalData) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/board`, formTotalData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};
