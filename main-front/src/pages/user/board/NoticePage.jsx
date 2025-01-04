import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import BoardSearch from "../../../components/shared/BoardSearch";
import NoticeBoardRow from "../../../components/board/NoticeBoardRow";

import { PageContainer } from "../../../styles/pageLayoutStyles";

export default function NoticePage() {
  return (
    <PageContainer>
      <PageTopImgBox
        imgName={"board"}
        title={"공지사항"}
        desc={"00의 새로운 소식과 각 부분의 다양한 서비스 등을 알려 드립니다."}
      />
      <BoardSearch />
      <BoardListContainer>
        <NoticeBoardRow title={"title"} content={"content"} date={"date"} />
      </BoardListContainer>
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
