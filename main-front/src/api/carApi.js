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
// export const createCar = async (formData) => {
//   try {
//     const response = await axios.post(`${SERVER_URL.LOCAL}/car`, formData);
//     return response;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };

// 차량 등록
export const createCar = async (formData) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/car`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // FormData로 보내는 경우 자동 설정
      },
    });
    return response.data; // 성공적인 응답 데이터 반환
  } catch (error) {
    // 오류 응답 처리
    throw error.response ? error.response.data : error.message;
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
