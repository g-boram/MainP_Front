import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";
import Flex from "../shared/Flex";
import { useNavigate } from "react-router-dom";
import Badge from "../shared/Badge";
import Spacing from "../shared/Spacing";

export default function NoticeBoardRow({ boardId, title, content, createdAt }) {
  const navigate = useNavigate();
  return (
    <BoardRowWrapper onClick={() => navigate(`/board/notice/detail/${boardId}`)}>
      <Flex justify={"space-between"} align={"center"}>
        <Flex align="center">
          <Badge label={"공지"} />
          <div id="title">{title}</div>
        </Flex>
        <div id="date">{createdAt}</div>
      </Flex>
      <Spacing size={20} />
      <div id="content">{content}</div>
    </BoardRowWrapper>
  );
}

const BoardRowWrapper = styled.div`
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  #title {
    font-size: 18px;
    font-weight: bold;
    color: ${colorPalette.fontBlack};
    margin: 10px 0;
  }
  #content {
    font-size: 14px;
    color: ${colorPalette.fontDarkGrey};
    height: 100%;
    overflow: hidden;
  }
  #date {
    font-size: 12px;
    color: ${colorPalette.fontGrey};
    bottom: 0;
  }
`;
