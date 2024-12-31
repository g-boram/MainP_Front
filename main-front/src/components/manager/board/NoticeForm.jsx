import React, { useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import { MANAGER_CATEGORY } from "../../../constants/category";
import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";

// 관리자-공지사항 폼양식
export default function NoticeForm() {
  const { user } = useSelector((state) => state.auth);
  console.log("user : ", user);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 첫 번째 파일을 선택
    setFile(selectedFile);
  };

  // const [formData, setFormData] = useState({
  //   title: "",
  //   content: "",
  //   userId: 4,
  //   status: "ACTIVE",
  //   role: "ADMIN",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("formData", formData);

  //   try {
  //     const response = await axios.post("http://localhost:8080/board", formData);
  //     alert("Board created successfully!");
  //     setFormData({ title: "", content: "", ...formData }); // Reset form
  //   } catch (error) {
  //     console.error("Error creating board:", error);
  //     alert("Failed to create the board. Please try again.");
  //   }
  // };

  // teest
  // const user = useUser()
  // const navigate = useNavigate()
  const [category, setCategory] = useState();
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    category: "",
    userId: 17,
    status: "ACTIVE",
    role: "ADMIN",
  });

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
      userId: 17,
      status: "ACTIVE",
      role: "ADMIN",
      imageUrl: "",
    };

    const formTotalData = new FormData();
    formTotalData.append("boardReq", JSON.stringify(data));
    formTotalData.append("file", file); // 선택한 파일을 FormData에 추가

    // console.log("formTotalData.entries()", formTotalData.entries());
    // FormData 내용 확인하기
    for (let pair of formTotalData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // key와 value 출력
    }

    //Test-------------------------------------------
    try {
      const response = await axios.post("http://localhost:8080/board", formTotalData, {
        headers: {
          "Content-Type": "multipart/form-data", // multipart/form-data 헤더 설정
        },
      });
      console.log("response: ", response.data);
      // 서버 응답 처리
      alert("게시글 등록 완료!");
      setFormValues({
        title: "",
        content: "",
        category: "",
        userId: 4,
        status: "ACTIVE",
        role: "ADMIN",
      });
      setFile(null); // 파일 상태 초기화
    } catch (e) {
      console.log("error", e);
      alert("게시글 등록 실패");
    }
    //Test-------------------------------------------

    // e.preventDefault();
    // const formData = {
    //   ...formValues,
    //   uid: user?.uid,
    //   email: user?.email,
    //   name: user?.displayName,
    //   category: category ? category.value : "info",
    // };
    // try {
    //   await addBoard(formData);
    //   setFormValues({
    //     title: "",
    //     content: "",
    //     category: "",
    //     uid: "",
    //     email: "",
    //     name: "",
    //   });
    //   toast.success("게시글 등록 완료!");
    //   navigate("/manager/data/setBoardData");
    // } catch (e) {
    //   console.log("error", e);
    // }
  };

  // function InputField({ label, id, ...props }) {
  //   return (
  //     <FormGroup>
  //       <label htmlFor={id}>{label}</label>
  //       <FormControlInput id={id} {...props} />
  //     </FormGroup>
  //   );
  // }

  // function TextareaField({ label, id, ...props }) {
  //   return (
  //     <FormGroup>
  //       <label htmlFor={id}>{label}</label>
  //       <FormControlTextArea id={id} {...props}></FormControlTextArea>
  //     </FormGroup>
  //   );
  // }

  return (
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
          <InputBox>체크박스 구현예정 ex. 활성화, 비활성화...</InputBox>
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
  );
}

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
    padding: 0px 10px;
    height: 35px;
  }
`;
