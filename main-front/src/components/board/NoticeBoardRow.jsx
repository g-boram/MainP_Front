import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";
import Flex from "../shared/Flex";

export default function NoticeBoardRow({ title, content, createdAt }) {
  return (
    <BoardRowWrapper>
      <Flex justify={"space-between"} align={"center"}>
        <div id="title">{title}</div>
        <div id="date">{createdAt}</div>
      </Flex>
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
  }
  #date {
    font-size: 12px;
    color: ${colorPalette.fontGrey};
    bottom: 0;
  }
`;
