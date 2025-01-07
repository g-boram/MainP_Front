import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import PaginationComponent from "../../../components/shared/pagination/PaginationComponent";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";
import BoardRow from "../../../components/manager/board/BoardRow";
import FilterButtons from "../../../components/shared/FilterButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchPagedBoards, setStatusFilter } from "../../../reduxSlice/boardListSlice";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import {
  ClearLoadingOverlay,
  ContentBox,
  ContentWrapper,
  ErrorBox,
  ErrorOverlay,
  ErrorText,
  ManagerContainer,
  NavRow,
  NotBoardBox,
  NotBoardOverlay,
  NotBoardText,
} from "../../../styles/managerLayoutStyles";

export default function M_NoticePage() {
  const dispatch = useDispatch();

  const { filteredBoards, isLoading, error, statusFilter } = useSelector((state) => state.boardList);
  console.log("filteredBoards: ", filteredBoards);

  useEffect(() => {
    dispatch(fetchPagedBoards({ page: 0, size: 10, sort: "boardId,desc" })); // 초기 페이지 로드
  }, [dispatch]);

  const handleFilterChange = (filter) => {
    dispatch(setStatusFilter(filter)); // 필터 상태 변경
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchPagedBoards({ page: newPage, size: 10, sort: "boardId,desc" })).then(() => {});
  };

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <HeadTitle title={"공지사항 목록"} desc={"공지사항 게시글 작업 페이지"}></HeadTitle>
        <ContentBox>
          <NavRow>
            <LinkButton
              to="/manager/board/notice/create"
              color="white"
              bgColor="black"
              text="게시글 등록하기"
              width="100px"
              height="30px"
              fontSize="12px"
            />
          </NavRow>
          {/* 필터 버튼 */}
          <FilterButtons currentFilter={statusFilter} onFilterChange={handleFilterChange} />
          <NoticeListWrapper>
            {isLoading && (
              <ClearLoadingOverlay>
                <ClipLoader color="#000" z-index={11} />
              </ClearLoadingOverlay>
            )}
            {error && (
              <ErrorOverlay>
                <ErrorBox>
                  <ErrorText>ERROR: {error}</ErrorText>
                </ErrorBox>
              </ErrorOverlay>
            )}
            {!isLoading && !error && (
              <Flex direction="column">
                <ListHeader
                  height="30px"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  bgColor="#eeeeee"
                  rowTitle={["No.-10", "제목-100", "내용-100", "작성자-20", "작성일-20", "게시상태-20", "-20"]}
                />
                {filteredBoards && filteredBoards.length > 0 ? (
                  filteredBoards.map((board) => <BoardRow {...board} key={board.boardId} />)
                ) : (
                  <NotBoardOverlay>
                    <NotBoardBox>
                      <NotBoardText>게시글이 없습니다.</NotBoardText>
                    </NotBoardBox>
                  </NotBoardOverlay>
                )}
              </Flex>
            )}
          </NoticeListWrapper>
          <PaginationComponent onPageChange={handlePageChange} />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const NoticeListWrapper = styled.div`
  min-height: 450px;
  width: 100%;
  overflow-y: hidden;
  position: relative;
  z-index: 1;
`;
