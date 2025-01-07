import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";

export default function BoardRow(board) {
  const navigate = useNavigate();
  const { boardId, title, content, createdAt, status, username } = board;

  const handleDetailPage = () => {
    navigate("/manager/board/notice/detail", { state: { ...board } });
  };

  const handleUpdatePage = () => {
    navigate("/manager/board/notice/update", { state: { ...board } });
  };

  return (
    <BoardRowWrapper status={status}>
      <div id="boardId">{boardId}</div>
      <div id="title" onClick={handleDetailPage}>
        {title}
      </div>
      <div id="content" onClick={handleDetailPage}>
        {content}
      </div>
      <div id="username">{username}</div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{status === "ACTIVE" ? "활성화" : "비활성화"}</div>
      <UpdateBtn onClick={handleUpdatePage}>수정</UpdateBtn>
      <DeleteBtn>삭제</DeleteBtn>
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
    color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")};
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

const UpdateBtn = styled.button`
  width: 120px;
  height: 85%;
  margin-top: 3px;
  font-size: 12px;
  background-color: ${colorPalette.btnBlue};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlue};
  }
`;

const DeleteBtn = styled.button`
  width: 120px;
  height: 85%;
  margin-top: 3px;
  font-size: 12px;
  background-color: ${colorPalette.btnRed};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverRed};
  }
`;
