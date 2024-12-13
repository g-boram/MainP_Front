import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import { HEIGHT_LIST } from "../../../constants/height";
import BoardSearch from "../../../components/shared/BoardSearch";
import BoardRow from "../../../components/board/BoardRow";

export default function BoardPage() {
  return (
    <BoardContainer>
      <PageTopImgBox
        imgName={"board"}
        title={"공지사항"}
        desc={"00의 새로운 소식과 각 부분의 다양한 서비스 등을 알려 드립니다."}
      />
      <BoardSearch />
      <BoardListContainer>
        <BoardRow title={"title"} content={"content"} date={"date"} />
      </BoardListContainer>
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
`;

const BoardListContainer = styled.div`
  width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border-top: 1px solid black;
`;
