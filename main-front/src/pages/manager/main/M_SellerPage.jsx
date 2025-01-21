import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import UserFilterRow from "../../../components/manager/user/UserFilterRow";
import UserRow from "../../../components/manager/user/UserRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../../api/userApi";
import { LuUserRoundX } from "react-icons/lu";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import CarSellChart from "../../../components/manager/sell/CarSellChart";
import { getAllCarSellList } from "../../../api/CarSellApi";

export default function M_SellerPage() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [carSellData, setCarSellData] = useState([]);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);
  console.log(carSellData);
  useEffect(() => {
    const allData = async () => {
      const data = await getAllCarSellList();
      setCarSellData(data);
    };
    allData();
  }, []);

  useEffect(() => {
    dispatch(setTotalItems(userData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(userData.slice(startIndex, endIndex));
  }, [userData, currentPage, itemsPerPage, dispatch]);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"M_SellerPage"} desc={"SELLER 권한 메인 페이지"}></HeadTitle>
          {/* 메인 차트 */}
          <CarSellChart carSellData={carSellData} />
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
