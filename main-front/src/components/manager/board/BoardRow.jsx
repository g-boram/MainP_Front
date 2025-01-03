import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";

export default function BoardRow({ boardId, title, content, createdAt, status, username }) {
  return (
    <BoardRowWrapper>
      <div id="boardId">{boardId}</div>
      <div id="title">{title}</div>
      <div id="content">{content}</div>
      <div id="username">{username}</div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
    </BoardRowWrapper>
  );
}

const BoardRowWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 10px;
  }
  #boardId {
    width: 10%;
  }
  #username {
    width: 25%;
  }
  #title {
    width: 100%;
  }
  #content {
    width: 100%;
    height: 100%;
    color: ${colorPalette.fontDarkGrey};
  }
  #createdAt {
    width: 25%;
    font-size: 12px;
    color: ${colorPalette.fontGrey};
  }
`;
