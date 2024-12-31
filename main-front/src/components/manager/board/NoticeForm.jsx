import React, { useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import { MANAGER_CATEGORY } from "../../../constants/category";
import { colorPalette } from "../../../styles/colorPalette";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../../api/boardApi";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

// 관리자-공지사항 폼양식
export default function NoticeForm() {
  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, board, error } = useSelector((state) => state.board);

  const [file, setFile] = useState(null);
  const [category, setCategory] = useState();
  const [isActive, setIsActive] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    category: "",
    userId: 0,
    status: "ACTIVE",
    role: "ADMIN",
  });

  const handleCheckboxChange = (e) => {
    setIsActive(e.target.checked);
  };
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

    const data = {
      title: formValues.title,
      content: formValues.content,
      category: category ? category.value : "other",
      userId: user ? user.userId : 0,
      status: formValues.status,
      role: user ? user.role : "NOT_ADMIN",
      imageUrl: "",
    };

    const formTotalData = new FormData();
    formTotalData.append("boardReq", JSON.stringify(data));
    formTotalData.append("file", file); // 선택한 파일을 FormData에 추가

    dispatch(createBoard(formTotalData));
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <BarLoader color="#000" z-index={11} cssOverride={{ margin: "0 auto", top: "50%" }} />
        </LoadingContainer>
      ) : (
        <FormContainer>
          <Flex direction="column">
            <Spacing size={10} />
            <Flex align={"center"}>
              <Label>카테고리</Label>
              <>
                <CreatableSelect
                  placeholder="카테고리를 선택해 주세요  (미선택시 기타로 등록)"
                  onChange={(newValue) => setCategory(newValue)}
                  options={MANAGER_CATEGORY}
                  value={category}
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
              <Label>활성화 여부</Label>
              <CheckBoxRow>
                <label id="active">바로 등록하기</label>
                <input id="active" type="checkbox" checked={isActive} onChange={handleCheckboxChange} />
              </CheckBoxRow>
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
              <Label>첨부파일</Label>
              <InputBox>
                <input type="file" name="file" onChange={handleFileChange} />
              </InputBox>
            </Flex>
          </Flex>
          <Spacing size={50} />
          <Flex justify={"center"}>
            <BaseButton color="black" full onClick={handleSubmit}>
              게시글 등록
            </BaseButton>
          </Flex>
        </FormContainer>
      )}
    </>
  );
}

const LoadingContainer = styled.div`
  min-height: 700px;
  width: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const FormContainer = styled.div`
  height: auto;
  width: 100%;
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
    border: 1px solid #eee;
    width: 25px;
    padding: 0px 10px;
    height: 25px;
  }
`;
