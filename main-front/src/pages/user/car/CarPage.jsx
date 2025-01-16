import styled from "@emotion/styled";
import { HEIGHT_LIST } from "../../../constants/height";
import CarSearch from "../../../components/shared/CarSearch";
import SideMenuBar from "../../../components/shared/SideMenuBar";
import { useEffect, useState } from "react";
import { getCarListAll } from "../../../api/carApi";
import CarBox from "../../../components/car/CarBox";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import Flex from "../../../components/shared/Flex";

export default function CarPage() {
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allData = async () => {
      const res = await getCarListAll();
      const cars = res.data.filter((car) => car.status === "AVAILABLE");
      setCarData(cars);
    };
    allData();
  }, []);
  console.log(carData);
  return (
    <CarListContainer>
      <LeftCategoryBox>
        <SideMenuBar setIsLoading={setIsLoading} setCarData={setCarData} />
      </LeftCategoryBox>
      <RightContentBox>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        {carData && carData.length !== 0 ? (
          <CarListWrapper>
            {carData.map((car) => (
              <CarBox key={car.id} {...car} />
            ))}
          </CarListWrapper>
        ) : (
          <NotDataWrapper>
            <BaseIconBox>
              <TbClipboardSearch size={40} />
              <div>차량이 없습니다.</div>
            </BaseIconBox>
          </NotDataWrapper>
        )}

        {/* <CarSearch /> */}
        {/* <EventCarWrapper /> */}
      </RightContentBox>
    </CarListContainer>
  );
}

const CarListContainer = styled.div`
  min-height: 100%;
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
  min-width: 300px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 600px) {
    max-height: 250px;
    padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
  }
`;

const RightContentBox = styled.div`
  height: 100%;
  width: 1100px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CarListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
