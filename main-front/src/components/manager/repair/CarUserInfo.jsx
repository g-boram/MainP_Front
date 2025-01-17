import styled from "@emotion/styled";

export default function CarUserInfo() {
  return (
    <InfoContainer>
      차량소유자-아이디, 이름, 핸드폰번호 판매담당자-아이디, 이름, 핸드폰번호 점검담당자-아이디, 이름, 핸드폰번호
    </InfoContainer>
  );
}

const InfoContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  margin-bottom: 20px;
  background-color: #eee;
`;
