import styled from "@emotion/styled/macro";
import { HEIGHT_LIST } from "../../../constants/height";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function CarSellPage() {
  return (
    <CarListContainer>
      <TopDiv>
        <DivContent>
          <p>딜러견적 비교해서 최고가에 팔기</p>
          <LinkStyle to="/carsell/estimate">
            <SellBtn>
              <p>HiCar 비교견적</p>
              <SlArrowRight />
            </SellBtn>
          </LinkStyle>
        </DivContent>
      </TopDiv>
      <DivContent>
        <BottomDiv>
          <p>원하는 가격에 직접 팔기</p>
          <LinkStyle>
            <BottomBtn>
              <p>직거래 간편등록</p>
              <SlArrowRight />
            </BottomBtn>
          </LinkStyle>
        </BottomDiv>
      </DivContent>
    </CarListContainer>
  );
}

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #000;
`;

const TopDiv = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 400px;
`;

const BottomDiv = styled.div`
  width: 135px;
`;

const DivContent = styled.div`
  width: 153px;
  p {
    font-weight: bold;
    font-size: 18px;
  }
`;

const SellBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  line-height: 0;
  padding: 8px;
  color: #fff;
  background-color: #d72e36;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  font-weight: 500;

  p {
    font-size: 13px;
  }
  svg {
    font-size: 11px;
    margin-bottom: 2px;
    margin-left: 5px;
  }
`;

const BottomBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
  p {
    font-size: 13px;
  }
  svg {
    font-size: 11px;
    margin-bottom: 2px;
    margin-left: 5px;
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
