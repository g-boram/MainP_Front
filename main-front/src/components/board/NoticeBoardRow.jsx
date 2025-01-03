import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";

export default function NoticeBoardRow({ title, content, date }) {
  return (
    <BoardRowWrapper>
      <div id="title">{title}</div>
      <div id="content">{content}</div>
      <div id="date">{date}</div>
    </BoardRowWrapper>
  );
}

const BoardRowWrapper = styled.div`
  height: 150px;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;

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
