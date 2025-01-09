import styled from "@emotion/styled";
import { colorPalette } from "../../../styles/colorPalette";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { deleteBoard } from "../../../api/boardApi";
import { useDispatch } from "react-redux";

export default function BoardRow(board) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { open } = useAlertContext();
  const { boardId, category, title, content, createdAt, status, username } = board;

  const handleDetailPage = () => {
    navigate("/manager/board/notice/detail", { state: { ...board } });
  };

  const handleUpdatePage = () => {
    navigate("/manager/board/notice/update", { state: { ...board } });
  };

  const confirmDelete = () => {
    open({
      title: "게시글 삭제",
      description: "해당 게시글을 삭제하시겠습니까?",
      isCancel: true,
      onButtonClick: () => {
        handleDeleteBoard();
      },
    });
  };
  const handleDeleteBoard = async () => {
    try {
      await deleteBoard(boardId, dispatch);

      open({
        title: "게시글 삭제",
        description: "게시글이 삭제되었습니다.",
        isCancel: false,
        onButtonClick: () => {},
      });
    } catch (error) {
      console.log("Delete Board Error: ", error);
    }
  };

  return (
    <BoardRowWrapper status={status}>
      <div id="boardId">{boardId}</div>
      <div id="category">{category}</div>
      <div id="title" onClick={handleDetailPage}>
        {title}
      </div>
      <div id="content" onClick={handleDetailPage}>
        {content}
      </div>
      <div id="username">{username}</div>
      <div id="createdAt">{createdAt.slice(0, 10)}</div>
      <div id="status">{status === "ACTIVE" ? "활성화" : "비활성화"}</div>
      <div id="btnBox">
        <UpdateBtn onClick={handleUpdatePage}>수정</UpdateBtn>
        <DeleteBtn onClick={confirmDelete}>삭제</DeleteBtn>
      </div>
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
  #category {
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
    width: 20%;
    font-size: 12px;
    color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")};
    border-radius: 5px;
    padding: 2px 5px;
    text-align: center;
  }
  #createdAt {
    width: 20%;
    font-size: 12px;
    color: ${colorPalette.fontGrey};
  }
  #btnBox {
    width: 20%;
  }

  :hover {
    background-color: #f7f7f7;
  }
`;

const UpdateBtn = styled.button`
  height: 30px;
  padding: 3px 10px;
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
  height: 30px;
  padding: 3px 10px;
  font-size: 12px;
  background-color: ${colorPalette.btnRed};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  margin-left: 5px;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverRed};
  }
`;
