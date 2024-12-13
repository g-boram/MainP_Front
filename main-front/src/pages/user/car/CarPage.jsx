import styled from "@emotion/styled";
import { HEIGHT_LIST } from "../../../constants/height";
import CarSearch from "../../../components/shared/CarSearch";
import EventCarBox from "../../../components/car/EventCarBox";

export default function CarPage() {
  return (
    <CarListContainer>
      <LeftCategoryBox>Category</LeftCategoryBox>
      <RightContentBox>
        <CarSearch />
        <EventCarBox />
        <div>CarList</div>
      </RightContentBox>
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  width: 1400px;
  display: flex;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const LeftCategoryBox = styled.div`
  height: 100%;
  min-width: 350px;
  display: flex;
  background-color: #ffd7d7;

  @media (max-width: 600px) {
    max-height: 250px;
    padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
  }
`;

const RightContentBox = styled.div`
  height: 100%;
  max-width: 1000px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
