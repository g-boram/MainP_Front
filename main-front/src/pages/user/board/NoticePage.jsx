import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import BoardSearch from "../../../components/shared/BoardSearch";
import NoticeBoardRow from "../../../components/board/NoticeBoardRow";
import CustomPagination from "../../../components/shared/pagination/CustomPagination";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPagedBoards, setCategoryBoard } from "../../../reduxSlice/boardListSlice";
import { ClearLoadingOverlay } from "../../../styles/managerLayoutStyles";
import { ClipLoader } from "react-spinners";
import { TbClipboardSearch } from "react-icons/tb";
import { BaseIconBox } from "../../../styles/miniComponentStyles";
import { setPage, setTotalItems } from "../../../reduxSlice/paginationSlice";

export default function NoticePage() {
  const dispatch = useDispatch();

  const [currentItems, setCurrentItems] = useState([]);

  const { categoryBoards, isLoading, error } = useSelector((state) => state.boardList);
  const { currentPage, itemsPerPage } = useSelector((state) => state.pagination);
  console.log("categoryBoards :", categoryBoards);

  useEffect(() => {
    dispatch(fetchPagedBoards({ page: 0, size: 10, sort: "boardId,desc" }));
    dispatch(setCategoryBoard("notice"));
  }, []);

  useEffect(() => {
    // 페이징 데이터를 설정
    dispatch(setTotalItems(categoryBoards.length));

    // 현재 페이지 데이터 계산
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(categoryBoards.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, categoryBoards, dispatch]);

  return (
    <PageContainer>
      <PageTopImgBox
        imgName={"board"}
        title={"공지사항"}
        desc={"00의 새로운 소식과 각 부분의 다양한 서비스 등을 알려 드립니다."}
      />
      <BoardSearch />
      <BoardListContainer>
        {isLoading && (
          <ClearLoadingOverlay>
            <ClipLoader color="#000" z-index={11} />
          </ClearLoadingOverlay>
        )}
        {currentItems && currentItems ? (
          currentItems.map((board) => (
            <>
              <NoticeBoardRow key={board.id} {...board} />
            </>
          ))
        ) : (
          <NotBoardWrapper>
            <BaseIconBox>
              <TbClipboardSearch size={40} />
              <div>게시글이 없습니다.</div>
            </BaseIconBox>
          </NotBoardWrapper>
        )}
      </BoardListContainer>
      <CustomPagination
        currentPage={currentPage}
        totalItems={categoryBoards.length}
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
