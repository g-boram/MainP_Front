import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import {
  ContentBox,
  ContentWrapper,
  ErrorBox,
  ErrorOverlay,
  ErrorText,
  LoadingOverlay,
  ManagerContainer,
  NavRow,
} from "../../../styles/managerLayoutStyles";
import BoardRow from "../../../components/manager/board/BoardRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchPagedBoards } from "../../../reduxSlice/boardListSlice";
import { useEffect } from "react";
import PaginationComponent from "../../../components/shared/pagination/PaginationComponent";
import { BarLoader } from "react-spinners";
import Flex from "../../../components/shared/Flex";
import ListHeader from "../../../components/shared/ListHeader";

export default function M_NoticePage() {
  const dispatch = useDispatch();
  const { boards, page, totalPages, isLoading, error } = useSelector((state) => state.boardList);
  console.log("boards: ", boards);

  useEffect(() => {
    dispatch(fetchPagedBoards({ page: 0, size: 10, sort: "boardId,desc" })); // 초기 페이지 로드
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    dispatch(fetchPagedBoards({ page: newPage }));
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
              width="120px"
              height="35px"
              fontSize="14px"
            />
          </NavRow>
          <NoticeListWrapper>
            {isLoading && (
              <LoadingOverlay>
                <BarLoader color="#000" z-index={11} />
              </LoadingOverlay>
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
                  height="35px"
                  bgColor="#fff"
                  borderB="#000"
                  borderT="#000"
                  fontSize="13px"
                  rowTitle={["No.-10", "제목-100", "내용-100", "작성자-25", "작성일-25"]}
                />
                {boards.map((board) => (
                  <BoardRow {...board} />
                ))}
              </Flex>
            )}
          </NoticeListWrapper>
          <PaginationComponent pageCount={totalPages} onPageChange={handlePageChange} />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const NoticeListWrapper = styled.div`
  max-height: 400px;
  width: 100%;
  overflow-y: hidden;
  position: relative;
  z-index: 1;
  background-color: #eee;
`;
