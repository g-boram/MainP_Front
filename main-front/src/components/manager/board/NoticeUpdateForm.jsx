import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import { MANAGER_CATEGORY } from "../../../constants/category";
import { colorPalette } from "../../../styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";

import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { createBoard, resetBoardState } from "../../../reduxSlice/boardCreateSlice";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { updateBoard } from "../../../api/boardApi";
import { css } from "@emotion/react";

// 관리자-공지사항 폼양식
export default function NoticeUpdateForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const { boardId, category, title, content, createdAt, updatedAt, status, username, imageUrl } = location.state || {};

  const { open } = useAlertContext();

  const [file, setFile] = useState(null);
  const [isCategory, setIsCategory] = useState();
  const [isActive, setIsActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    boardId: "",
    title: "",
    content: "",
    category: "",
    userId: 0,
  });

  useEffect(() => {
    setFormValues({
      boardId: boardId,
      title: title,
      content: content,
      category: category,
      status: status,
      createdAt: createdAt,
      updatedAt: updatedAt,
      username: username,
      imageUrl: imageUrl,
      updateUserId: user.id,
    });
  }, []);
  console.log("formValue: ", formValues);
  useEffect(() => {
    if (location.state && user) {
      // setFormValues({
      //   boardId: boardId,
      //   title: title,
      //   content: content,
      //   category: category,
      //   status: status,
      //   createdAt: createdAt,
      //   updatedAt: updatedAt,
      //   username: username,
      //   imageUrl: imageUrl,
      //   updateUserId: user.id,
      // });
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [location.state, user]);

  // useEffect(() => {
  //   if (board) {
  //     open({
  //       title: "게시글 수정 성공",
  //       description: "리스트 페이지로 이동합니다.",
  //       isCancel: false,
  //       onButtonClick: () => {
  //         dispatch(resetBoardState());
  //         navigate("/manager/board/notice");
  //       },
  //     });
  //   }

  //   if (error) {
  //     // 로그인 실패 시
  //     open({
  //       title: "게시글 수정 실패",
  //       description: error.message || error,
  //       isCancel: false,
  //       onButtonClick: () => {
  //         // dispatch(resetBoardState());
  //       },
  //     });
  //   }
  // }, [board, error, open, dispatch, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormValues = (e) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      title: formValues.title,
      content: formValues.content,
      category: isCategory ? isCategory.value : category,
      boardId: boardId,
      updateUserId: user ? user.id : 0,
      status: isActive ? "ACTIVE" : "INACTIVE",
      imageUrl: imageUrl ? imageUrl : "",
    };
    // {
    //   "title": "새로운 게시글 제목",
    //   "content": "게시글 내용이 변경되었습니다.",
    //   "category": "공지사항",
    //   "updateUserId": 1,
    //   "status": "ACTIVE",
    //   "imageUrl": "https://example.com/images/updated-image.jpg",
    //   // "boardId" : 10
    //   }
    console.log("updateData : ", updateData);
    const formData = new FormData();
    formData.append("boardReq", JSON.stringify(updateData));
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await updateBoard(formData);
      alert(response.message);
    } catch (error) {
      alert("게시글 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <FormContainer>
      {/* {isLoading && (
        <LoadingOverlay>
          <BarLoader color="#000" z-index={11} />
        </LoadingOverlay>
      )} */}
      <Flex direction="column">
        <Spacing size={10} />
        <Flex align={"center"}>
          <>
            <Label>Board Id</Label>
            <ValueRow>{boardId}</ValueRow>
          </>
          <>
            <Label>작성자</Label>
            <ValueRow>{username}</ValueRow>
          </>
          <>
            <Label>생성일</Label>
            <ValueRow>{createdAt.slice(0, 10)}</ValueRow>
          </>
          <>
            <Label>수정일</Label>
            <ValueRow>{updatedAt.slice(0, 10)}</ValueRow>
          </>
        </Flex>
        <Spacing size={20} />
        <Flex align={"center"}>
          <>
            <Label>현재 카테고리</Label>
            <ValueRow>{category}</ValueRow>
          </>
          <>
            <Label>변경 카테고리</Label>
            <CreatableSelect
              placeholder="카테고리를 선택해 주세요"
              onChange={(newValue) => setIsCategory(newValue)}
              options={MANAGER_CATEGORY}
              value={isCategory}
              styles={{
                container: (containerStyles) => ({
                  ...containerStyles,
                  width: "100%",
                  fontSize: "13px",
                  border: "1px solid #eee",
                  borderRadius: 0,
                }),
                control: (controlStyles) => ({
                  ...controlStyles,
                  borderRadius: 0,
                  border: "1px solid #eee",
                }),
                menu: (controlStyles) => ({
                  ...controlStyles,
                  borderRadius: 0,
                }),
              }}
            />
          </>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <>
            <Label>활성화 여부</Label>
            <BaseButton color={isActive === 1 ? "success" : "grey"} css={activeBtn} onClick={() => setIsActive(1)}>
              활성화
            </BaseButton>
            <Spacing size={10} direction="horizontal" />
            <BaseButton color={isActive === 0 ? "error" : "grey"} css={activeBtn} onClick={() => setIsActive(0)}>
              비활성화
            </BaseButton>
          </>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>제목</Label>
          <InputBox>
            <input name="title" id="title" onChange={handleFormValues} value={formValues.title} />
          </InputBox>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>내용</Label>
          <TextareaBox>
            <textarea name="content" id="content" onChange={handleFormValues} value={formValues.content} />
          </TextareaBox>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <>
            <Label>첨부파일</Label>
            <ValueRow>{imageUrl}</ValueRow>
          </>
          <Label>변경 첨부파일</Label>
          <InputBox>
            <input type="file" name="file" onChange={handleFileChange} />
          </InputBox>
        </Flex>
      </Flex>
      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={handleSubmit}>
          게시글 등록
        </BaseButton>
      </Flex>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  min-width: 15%;
  height: 35px;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  border-left: 3px solid ${colorPalette.notice_form};
`;

const TextareaBox = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & textarea {
    border: 1px solid #eee;
    width: 100%;
    padding: 10px 10px;
    min-height: 300px;
  }
`;

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 5px;
    height: 35px;
  }
`;

const CheckBoxRow = styled.div`
  height: 35px;
  width: 100%;
  gap: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & input {
    height: 20px;
    width: 20px;
    border: 1px solid #eee;
    padding: 0px 10px;
  }
`;

const ValueRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${colorPalette.fontDarkGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  padding-right: 10px;
`;

const ActiveRow = styled.div`
  height: 35px;
  width: 100%;
  color: ${({ status }) => (status === "ACTIVE" ? "green" : "red")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  padding-right: 10px;
`;

// CSS
const activeBtn = css`
  height: 40px;
  width: 100%;
`;
