import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import CarRow from "../../../components/manager/car/CarRow";
import CarFilterRow from "../../../components/manager/car/CarFilterRow";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { TbClipboardSearch } from "react-icons/tb";
import { getCarListAll } from "../../../api/carApi";

export default function M_RepairPage() {
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allData = async () => {
      const data = await getCarListAll();
      setCarData(data.data);
    };
    allData();
  }, []);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"자동차정비 목록"} desc={"자동차정비 관련 작업페이지"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/repair/create"
              color="white"
              bgColor="black"
              text="차량 등록하기"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          {/* 필터 버튼 */}
          <CarFilterRow setIsLoading={setIsLoading} setCarData={setCarData} />
          <CarListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {carData && carData.length !== 0 ? (
              <Flex direction="column">
                <ListHeader
                  height="30px"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  bgColor="#eeeeee"
                  rowTitle={[
                    "ID.-50",
                    "제조사-100",
                    "모델명-200",
                    "가격-100",
                    "제조 연도-100",
                    "연료종류-100",
                    "주행거리-120",
                    "변속기종류-100",
                    "판매자 ID-80",
                    "색상-40",
                    "작성일-120",
                    "판매상태-80",
                    "-100",
                  ]}
                />
                {carData.map((car) => (
                  <CarRow key={car.id} {...car} />
                ))}
              </Flex>
            ) : (
              <NotDataWrapper>
                <BaseIconBox>
                  <TbClipboardSearch size={40} />
                  <div>차량이 없습니다.</div>
                </BaseIconBox>
              </NotDataWrapper>
            )}
          </CarListWrapper>
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const CarListWrapper = styled.div`
  height: 500px;
  /* overflow-y: scroll; */
`;

const NotDataWrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
