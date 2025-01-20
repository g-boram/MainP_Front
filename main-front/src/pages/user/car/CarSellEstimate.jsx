import { useState } from "react";
import styled from "@emotion/styled/macro";
import axios from "axios";
import { HEIGHT_LIST } from "../../../constants/height";
import { Link } from "react-router-dom";

const BASE_URL = "http://localhost:8081"; // Spring Boot 서버 URL

export default function CarSellEstimate() {
  const [step, setStep] = useState(1); // 1: 차량번호 입력, 2: 소유자명 입력, 3: 생년월일 입력
  const [carNumber, setCarNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // 다음 단계로 이동
  const handleNext = async () => {
    const isValid = await validateCarNumber(carNumber);
    console.log("isValid", isValid);
    if (step === 1) {
      if (carNumber.trim() === "") {
        alert("차량번호를 입력해주세요.");
        return;
      }
      if (isValid) {
        setStep(2);
      } else {
        alert("유효하지 않은 차량번호입니다.");
      }
    } else if (step === 2) {
      if (ownerName.trim() === "") {
        alert("소유자명을 입력해주세요.");
        return;
      }
      const isValid = await validateOwnerName(ownerName, carNumber);
      if (isValid) {
        setStep(3); // 다음 단계로 전환
      } else {
        alert("차량번호와 소유자명이 일치하지 않습니다.");
      }
    } else if (step === 3) {
      if (!validateBirthDate(birthDate)) {
        alert("유효한 생년월일을 입력해주세요. (예: 1990-01-01)");
        return;
      }
      const isValid = await validateBirthDateOnServer(birthDate, carNumber);
      if (isValid) {
        alert("모든 정보가 유효합니다.");
      } else {
        alert("생년월일이 일치하지 않습니다.");
      }
    }
  };

  // 차량번호 유효성 검증 API 호출 (axios로 변경)
  const validateCarNumber = async (carNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/details/validate/${carNumber}`
      );
      console.log(response.data);
      console.log(carNumber);

      return response.data.valid; // `isValid` 필드가 true이면 유효한 차량번호로 처리
    } catch (error) {
      console.error("Error validating car number:", error);
      return false;
    }
  };

  // 소유자명 유효성 검증 API 호출 (axios로 변경)
  const validateOwnerName = async (ownerName, carNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/details/validate/ownername`,
        {
          params: { ownerName, carNumber },
        }
      );
      console.log(response.data);
      console.log(ownerName);
      return response.data.valid; // `isValid`가 true일 경우 유효한 소유자명
    } catch (error) {
      console.error("Error validating owner name:", error);
      return false;
    }
  };

  // 생년월일 유효성 검증 API 호출 (axios로 변경)
  const validateBirthDateOnServer = async (birthDate, carNumber) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/details/validate/birthdate`,
        {
          params: { birthDate, carNumber },
          withCredentials: true,
        }
      );
      return response.data.valid; // `isValid`가 true이면 생년월일이 유효함
    } catch (error) {
      console.error("Error validating birth date:", error);
      return false;
    }
  };

  // 생년월일 유효성 검사 (형식 확인)
  const validateBirthDate = (date) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식
    if (!regex.test(date)) return false; // 잘못된 형식일 경우 false 반환
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  };

  // 생년월일 입력 포맷팅
  const handleBirthDateChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    let formattedDate = input;

    if (input.length > 4) {
      formattedDate = `${input.slice(0, 4)}-${input.slice(4)}`;
    }
    if (input.length > 6) {
      formattedDate = `${formattedDate.slice(0, 7)}-${input.slice(6)}`;
    }
    setBirthDate(formattedDate.slice(0, 10)); // 최대 10자리
  };

  return (
    <CarListContainer>
      {/* 차량번호 입력 */}
      <TextArea>
        <Text>먼저,</Text>
        <Text>차량의 번호를 입력해주세요</Text>
        <InputBox
          placeholder="123가 1234"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          disabled={step > 1}
        />
      </TextArea>

      {/* 소유자명 입력 */}
      {step >= 2 && (
        <TextArea>
          <Text>이제,</Text>
          <Text>소유주 이름을 입력해주세요</Text>
          <InputBox
            placeholder="홍길동"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            disabled={step > 2}
          />
        </TextArea>
      )}

      {/* 생년월일 입력 */}
      {step === 3 && (
        <TextArea>
          <Text>마지막으로,</Text>
          <Text>소유주의 생년월일을 입력해주세요</Text>
          <InputBox
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChange={handleBirthDateChange}
          />
        </TextArea>
      )}

      {/* 다음 버튼 */}
      <FormBtn onClick={handleNext}>{step === 3 ? "완료" : "다음"}</FormBtn>
    </CarListContainer>
  );
}

const FormBtn = styled.div`
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  color: #fff;
  background-color: #d72e36;
  cursor: pointer;
`;

const Text = styled.span`
  color: #1a1a1a;
  display: block;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.44px;
  line-height: 30px;
`;

const TextArea = styled.div`
  margin-top: 30px;
`;

const InputBox = styled.input`
  margin-top: 15px;
  background: none;
  border: 1px solid #000;
  border-radius: 8px;
  box-sizing: border-box;
  color: rgb(51, 51, 51);
  font-size: 30px;
  font-weight: 600;
  height: 100%;
  letter-spacing: -0.6px;
  line-height: 36px;
  outline: none;
  padding: 7px 30px;
  width: 100%;
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 80px;

  ::placeholder {
    color: #c4c4c4;
  }

  &:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    color: #a0a0a0;
    cursor: not-allowed;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }
`;

const CarListContainer = styled.div`
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
