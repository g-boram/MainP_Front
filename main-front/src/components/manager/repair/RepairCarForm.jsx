import React, { useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CarUserInfo from "./CarUserInfo";
import CarInfoForm from "./CarInfoForm";
import CarOptionForm from "./CarOptionForm";

import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { css } from "@emotion/react";
import { createCar } from "../../../api/carApi";
import { toast } from "react-toastify";

// 관리자-자동차정비 등록
export default function RepairCarForm() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { open } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState();
  const [file, setFile] = useState(null);

  // 차량 기본정보
  const [carInfoData, setCarInfoData] = useState({
    sellerId: 0,
    orderUserId: 0,
    carNumber: "",
    make: "",
    model: "",
    year: 0,
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    color: "",
    status: "AVAILABLE",
    description: "",
    imageUrl: "",
    eventName: "",
    eventEndTime: null,
    hashTags: [],
  });

  // 차량 옵션정보
  const [carOptionData, setCarOptionData] = useState({
    optionIcon: "", // icon
    eEmission: "", // 배출가스
    tuning: "", // 튜닝
    special: "", // 특별이력
    changeUsed: "", // 용도변경
    accident: "", // 사고이력
    simpleRepair: "", // 단순수리
  });

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "차량 등록",
      description: "차량을 등록 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    // setIsLoading(true);
    const test = {
      orderUserId: "", // 추가컬럼
      carOptionData: [carOptionData],
      ...carInfoData,
    };
    console.log("test", test);

    // 이미지 등록시 사용
    // const formTotalData = new FormData();
    // formTotalData.append("carReq", JSON.stringify(data));
    // if (file != null) {
    //   formTotalData.append("file", file);
    // }

    // try {
    //   await createCar(formTotalData);

    //   setIsLoading(false);
    //   toast.success("🚓 차량 등록 완료!");
    //   navigate("/manager/car");
    // } catch (error) {
    //   console.error("Error car creation:", error);
    //   toast.error("🚓 등록 실패! 관리자 문의 바랍니다.");
    // }
  };

  // 선택된 이미지 미리보기 생성 하기
  const handleUploadFile = (e) => {
    const files = e.target.files;

    if (files !== null) {
      const theFile = files[0];
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const result = finishedEvent.target.result;
        setCurrentImg(result);
      };
      if (!theFile) return;
      reader.readAsDataURL(theFile);
    }
  };
  const handleRemoveFile = (e) => {
    setFile(null);
    setCurrentImg(null);
  };

  return (
    <FormContainer>
      {isLoading && (
        <LoadingOverlay>
          <BarLoader color="#000" z-index={11} />
        </LoadingOverlay>
      )}
      <CarUserInfo></CarUserInfo>
      <CarInfoForm carInfoData={carInfoData} setCarInfoData={setCarInfoData} />
      <CarOptionForm carOptionData={carOptionData} setCarOptionData={setCarOptionData} />

      {/* <Flex>
          <Label>활성화 여부</Label>
          <BaseButton color={isAvailable === 1 ? "success" : "grey"} css={activeBtn} onClick={() => setIsAvailable(1)}>
            판매중
          </BaseButton>
          <Spacing size={10} direction="horizontal" />
          <BaseButton color={isAvailable === 0 ? "error" : "grey"} css={activeBtn} onClick={() => setIsAvailable(0)}>
            판매완료
          </BaseButton>
        </Flex>

      <FileRow>
        <Label>첨부파일</Label>
        <FileBox>{currentImg ? <img src={currentImg} alt="" /> : ""}</FileBox>
        <Flex direction="column" justify="flex-end">
          <input type="file" name="file" onChange={handleUploadFile} />
          <Spacing size={10} />
          <BaseButton size="small" color="black" height={"30px"} width={"100px"} onClick={handleRemoveFile}>
            파일 삭제
          </BaseButton>
        </Flex>
      </FileRow> */}

      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          TEST
        </BaseButton>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          차량 등록하기
        </BaseButton>
      </Flex>
      <Spacing size={50} />
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: auto;
  width: 100%;
  position: relative;
`;

const Label = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
  background-color: #eee;
`;

const activeBtn = css`
  height: 40px;
  width: 100%;
`;

const FileRow = styled.div`
  display: flex;
  min-height: 100px;
`;

const FileBox = styled.div`
  height: 150px;
  width: 150px;
  border: 1px solid #eee;
  background-color: #eee;
  margin-right: 10px;

  > img {
    height: 150px;
    width: 150px;
    object-fit: contain;
  }
`;
