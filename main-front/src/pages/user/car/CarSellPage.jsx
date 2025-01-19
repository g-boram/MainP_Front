import { useState } from "react";
import styled from "@emotion/styled/macro";
import axios from "axios";
import { HEIGHT_LIST } from "../../../constants/height";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";

export default function CarSellPage() {
  const [step, setStep] = useState(1); // 단계
  const [selectedColor, setSelectedColor] = useState(""); // 차량 색상 상태
  const [specialNotes, setSpecialNotes] = useState(""); // 차량 특이사항 상태

  // 색상 목록 
  const colors = [
    { name: "검정색", value: "#000000" },
    { name: "흰색", value: "#FFFFFF" },
    { name: "쥐색", value: "#7D7D7D" },
    { name: "청색", value: "#0000FF" },
    { name: "은회색", value: "#C0C0C0" },
    { name: "진주색", value: "#FDEBD0" },
    { name: "흰색투톤", value: "#F5F5F5" },
    { name: "검정투톤", value: "#2C2C2C" },
    { name: "빨간색", value: "#fa3f3f" },
  ];

  return (
    <CarListContainer>
      <TopTittle>방문 차량 판매신청</TopTittle>
      <TextArea>
        <Text>원하시는 지역을 입력해주세요</Text>
        <InputBox placeholder="ex)서울 특별시 구로구 OO길 OO" disabled={step > 1} />
      </TextArea>
      <TextArea>
        <Text>휴대폰 번호를 입력해 주세요.</Text>
        <InputBox placeholder="ex) 010-0000-0000" disabled={step > 2} />
      </TextArea>
      <TextArea>
        <Text>원하는 시간대를 입력해주세요</Text>
        <InputBox placeholder="ex)14시20분" disabled={step > 3} />
      </TextArea>
      <TextArea>
  <Text>차량 주행거리를 입력해주세요 (km)</Text>
  <InputBox placeholder="ex) 120,000" />
</TextArea>
  <TextArea>
    <Text>판매 희망 금액을 입력해주세요 (만원)</Text>
    <InputBox placeholder="ex) 500" />
  </TextArea>
      <TextArea>
        <Text>차량 색상을 선택해주세요</Text>
        <ColorGrid>
     
          {colors.map((color) => (
            <ColorOption key={color.name}>
              <ColorBox style={{ backgroundColor: color.value }} />
              <ColorName>{color.name}</ColorName>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="carColor"
                  value={color.name}
                  checked={selectedColor === color.name}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
              </RadioLabel>
            </ColorOption>
          ))}
        </ColorGrid>
      </TextArea>

      <TextArea>
        <Text>
          차량 특이사항
        </Text>
        <TextAreaInput
        value={specialNotes}
        onChange={(e) => setSpecialNotes(e.target.value)}
        placeholder="특이사항을 입력해주세요."></TextAreaInput>
      </TextArea>
      <FormBtn>신청서 제출하기</FormBtn>
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

const TextAreaInput = styled.textarea`
  width: 100%;
  height: 150px; 
  resize: vertical; 
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  font-weight:bold;
  line-height: 1.5;
  margin-top:10px;

  ::placeholder {
    color: #c4c4c4;
  }
`;

const TopTittle = styled.h1`
  
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 15px;
`;

const ColorOption = styled.div`
  text-align: center;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ColorName = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const RadioLabel = styled.label`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const RadioInput = styled.input`
  cursor: pointer;
`;

const CarListContainer = styled.div`
user-select: none;
  min-height: 100%;
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 100px;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const TextArea = styled.div`
  margin-top: 30px;
`;

const Text = styled.span`
  color: #1a1a1a;
  display: block;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.44px;
  line-height: 30px;
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
