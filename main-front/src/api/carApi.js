import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 전체 차량 조회
export const getCarListAll = async () => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/car`);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 필터링 차량 조회
export const getFilterCarList = async (filters) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/car/filter`, { params: filters });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 차량 등록
export const createCar = async (formData) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/car`, formData);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 차량 수정
export const updateCar = async ({ carId, formTotalData }) => {
  try {
    const response = await axios.put(`${SERVER_URL.LOCAL}/car/${carId}`, formTotalData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// 차량 삭제
export const deleteCar = async (carId) => {
  try {
    const response = await axios.delete(`${SERVER_URL.LOCAL}/car/${carId}`);

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// // 게시판 삭제
// export const detailBoardById = async (boardId) => {
//   try {
//     const response = await axios.get(`${SERVER_URL.LOCAL}/board/${boardId}`);

//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };
