import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";
import EventBoardRow from "../../../components/board/EventBoardRow";
import Badge from "../../../components/shared/Badge";
import Flex from "../../../components/shared/Flex";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPagedBoards } from "../../../reduxSlice/boardListSlice";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";

export default function EventPage() {
  const dispatch = useDispatch();

  const [currentItems, setCurrentItems] = useState([]);
  const [activeTab, setActiveTab] = useState("ing");

  const { filteredBoards, isLoading } = useSelector((state) => state.boardList);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);

  useEffect(() => {
    const fetchBoards = async () => {
      await dispatch(fetchPagedBoards({ page: 0, size: 10, sort: "boardId,desc" }));
    };

    fetchBoards();
  }, [dispatch]);

  const ingEventData = () => {
    const setEventData = filteredBoards.filter((board) => board.category === "event" && board.status === "ACTIVE");
    dispatch(setTotalItems(setEventData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(setEventData.slice(startIndex, endIndex));
  };

  const finishEventData = () => {
    const setEventData = filteredBoards.filter((board) => board.category === "event" && board.status === "INACTIVE");
    dispatch(setTotalItems(setEventData.length));

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(setEventData.slice(startIndex, endIndex));
  };

  useEffect(() => {
    if (activeTab === "ing") {
      ingEventData();
    } else {
      finishEventData();
    }
  }, [activeTab, currentItems, filteredBoards, currentPage, itemsPerPage]);

  return (
    <PageContainer>
      <PageTopImgBox imgName={"board"} title={"이벤트"} desc={"00에서 진행중인 이벤트 소식을 확인해보세요."} />
      <EventBtnRow>
        <Flex>
          <Badge onClickFn={() => setActiveTab("ing")} label={"진행 중 이벤트"} color={"#1a831d"} />
          <Badge onClickFn={() => setActiveTab("finish")} label={"종료된 이벤트"} color={"#c3453c"} />
        </Flex>
      </EventBtnRow>
      <BoardListContainer>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        {currentItems && currentItems.length !== 0 ? (
          currentItems.map((board) => (
            <>
              <EventBoardRow key={board.id} {...board} />
            </>
          ))
        ) : (
          <NotBoardWrapper>
            <BaseIconBox>
              <TbClipboardSearch size={40} />
              <div>이벤트가 없습니다.</div>
            </BaseIconBox>
          </NotBoardWrapper>
        )}
      </BoardListContainer>
      <CustomPagination
        currentPage={currentPage}
        totalItems={filteredBoards.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => dispatch(setPage(page))}
      />
    </PageContainer>
  );
}

const BoardListContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const NotBoardWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EventBtnRow = styled.div`
  background-color: #f8f8f8;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px 20px;
`;
