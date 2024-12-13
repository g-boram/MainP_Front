import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import { HEIGHT_LIST } from "../../../constants/height";

export default function BoardPage() {
  return (
    <BoardContainer>
      <PageTopImgBox
        imgName={"board"}
        title={"공지사항"}
        desc={"00의 새로운 소식과 각 부분의 다양한 서비스 등을 알려 드립니다."}
      />
    </BoardContainer>
  );
}

const BoardContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
  display: flex;
  flex-direction: column;
  background-color: pink;
`;
