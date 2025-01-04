import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";

export default function BoardRow({ boardId, title, content, createdAt, status, username }) {
  return (
    <BoardRowWrapper status={status}>
      {" "}
      {/* Pass status to the styled component */}
      <div id="boardId">{boardId}</div>
      <div id="title">{title}</div>
      <div id="content">{content}</div>
      <div id="username">{username}</div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{status === "ACTIVE" ? "활성화" : "비활성화"}</div>
    </BoardRowWrapper>
  );
}

const BoardRowWrapper = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  font-size: 12px;
  border-bottom: 1px solid #ccc;
  color: ${colorPalette.fontBlack};
  cursor: pointer;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 0 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #boardId {
    width: 10%;
  }
  #username {
    width: 20%;
  }
  #title {
    width: 100%;
    font-weight: bold;
  }
  #content {
    width: 100%;
    color: ${colorPalette.fontDarkGrey};
  }
  #status {
    width: 22%;
    font-size: 12px;
    color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")}; /* Now it correctly references the status prop */
    border-radius: 5px;
    padding: 2px 5px;
    text-align: center;
  }
  #createdAt {
    width: 25%;
    font-size: 12px;
    color: ${colorPalette.fontGrey};
  }

  :hover {
    background-color: #f7f7f7;
  }
`;
