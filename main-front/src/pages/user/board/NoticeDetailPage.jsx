import styled from "@emotion/styled";
import PageTopImgBox from "../../../components/shared/PageTopImgBox";
import PageRouteBox from "../../../components/shared/PageRouteBox";

import { PageContainer } from "../../../styles/pageLayoutStyles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailBoardById } from "../../../api/boardApi";
import { colorPalette } from "../../../styles/colorPalette";
import { FaRegFrownOpen } from "react-icons/fa";
import { ErrorBox, ErrorText } from "../../../styles/managerLayoutStyles";

export default function NoticeDetailPage() {
  const { id } = useParams();
  const [boardData, setBoardData] = useState();

  console.log("boardData", boardData);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const board = await detailBoardById(id); // 비동기 함수 호출
        setBoardData(board); // 데이터 설정
      } catch (error) {
        console.error("Error fetching board details:", error);
      }
    };

    getBoard(); // 함수 실행
  }, [id]);

  return (
    <PageContainer>
      <PageTopImgBox
        imgName={"board"}
        title={"공지사항"}
        desc={"00의 새로운 소식과 각 부분의 다양한 서비스 등을 알려 드립니다."}
      />
      <BoardListContainer>
        <PageRouteBox width="300px" bgColor={colorPalette.routeBox_Base} rowTitle={["Home", "공지사항"]} />
        {boardData ? (
          <BoardDetailWrapper>
            <Header>
              <div id="title">{boardData.title}</div>
              <div id="headRight">
                <div>Todo</div>
                <div>{boardData.createdAt}</div>
              </div>
            </Header>
            <Content>{boardData.content}</Content>
          </BoardDetailWrapper>
        ) : (
          <ErrorWrapper>
            <ErrorBox>
              <FaRegFrownOpen />
              <ErrorText>ERROR</ErrorText>
            </ErrorBox>
          </ErrorWrapper>
        )}
      </BoardListContainer>
    </PageContainer>
  );
}

const BoardListContainer = styled.div`
  position: relative;
  width: 1200px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
`;

const BoardDetailWrapper = styled.div``;

const Header = styled.div`
  height: 80px;
  margin-top: 50px;
  display: flex;
  padding-bottom: 20px;
  border-bottom: 2px solid #000;
  justify-content: space-between;
  align-items: flex-end;

  #title {
    font-size: 18px;
    color: #000;
  }
  #headRight {
    font-size: 12px;
    color: grey;
  }
`;

const Content = styled.div`
  padding: 100px 0 0 0;
`;

const ErrorWrapper = styled.div`
  padding-top: 100px;
  margin: 0px auto;
`;
