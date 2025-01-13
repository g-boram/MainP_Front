import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import CarColorList from "./CarColorList";

import { colorPalette } from "../../../styles/colorPalette";
import { useSelector } from "react-redux";
import { useAlertContext } from "../../../contexts/AlertContextProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { LoadingOverlay } from "../../../styles/managerLayoutStyles";
import { css } from "@emotion/react";
import { updateCar } from "../../../api/carApi";
import { toast } from "react-toastify";
import { CAR_OPTION_FUELTYPE, CAR_OPTION_TRANSMISSION, findCountryByCar, YEARS } from "../../../constants/carOption";

export default function CarUpdateForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { open } = useAlertContext();

  const [carId, setCarId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [isAvailable, setIsAvailable] = useState(1);

  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    sellerId: 0,
    make: "",
    model: "",
    year: 0,
    price: "",
    mileage: "",
    fuelType: "",
    transmission: "",
    color: "",
    status: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    setIsLoading(true);
    if (location.state) {
      const findCountry = findCountryByCar(location.state.make);
      setCountry(findCountry);

      setFormValues({
        sellerId: location.state.sellerId,
        make: location.state.make,
        model: location.state.model,
        price: location.state.price,
        mileage: location.state.mileage,
        description: location.state.description,
        imageUrl: location.state.imageUrl,
      });
      setCarId(location.state.carId);
      setYear(location.state.year);
      setColor(location.state.color);
      setFuelType(location.state.fuelType);
      setTransmission(location.state.transmission);
      setIsAvailable(location.state.status === "AVAILABLE" ? 1 : 0);
    }
    setIsLoading(false);
  }, [location.state]);

  console.log("formValues: ", formValues);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleFormValues = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const confirmCreate = (e) => {
    e.preventDefault();
    open({
      title: "차량 수정",
      description: "차량을 수정 하시겠습니까?",
      isCancel: true,
      onButtonClick: () => handleSubmit(),
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = {
      sellerId: formValues.sellerId,
      make: formValues.make,
      model: formValues.model,
      year: year.value,
      price: formValues.price,
      mileage: formValues.mileage,
      fuelType: fuelType.value,
      transmission: transmission.value,
      color: color,
      status: isAvailable ? "AVAILABLE" : "SOLD",
      description: formValues.description,
      imageUrl: formValues.imageUrl,
    };

    const formTotalData = new FormData();
    formTotalData.append("carReq", JSON.stringify(data));
    if (file != null) {
      formTotalData.append("file", file);
    }

    try {
      await updateCar({ carId, formTotalData });

      setIsLoading(false);
      toast.success("🚓 차량 수정 완료!");
      navigate("/manager/car");
    } catch (error) {
      console.error("Error car creation:", error);
      toast.error("🚓 수정 실패! 관리자 문의 바랍니다.");
    }
  };
  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "100%",
      fontSize: "13px",
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
  };

  return (
    <FormContainer>
      {isLoading && (
        <LoadingOverlay>
          <BarLoader color="#000" z-index={11} />
        </LoadingOverlay>
      )}
      <Flex direction="column">
        <Flex align={"center"}>
          <Label>나라</Label>
          <ValueRow>{country}</ValueRow>
          <Spacing size={20} direction={"width"} />
          <Label>제조사</Label>
          <ValueRow>{formValues.make}</ValueRow>
          <Spacing size={20} direction={"width"} />
          <Label>모델</Label>
          <ValueRow>{formValues.model}</ValueRow>
        </Flex>
        <Spacing size={10} />

        <Flex align={"center"}>
          <Label>제조 연도</Label>
          <CreatableSelect
            placeholder="Year"
            name="year"
            onChange={(newValue) => setYear(newValue)}
            options={YEARS}
            value={year}
            styles={selectStyle}
          />
          <Spacing size={20} direction={"width"} />

          <Label>가격</Label>
          <InputBox>
            <input name="price" id="price" placeholder="0" onChange={handleFormValues} value={formValues.price} />
          </InputBox>
          <Spacing size={20} direction={"width"} />

          <Label>주행거리(km)</Label>
          <InputBox>
            <input name="mileage" id="mileage" placeholder="0" onChange={handleFormValues} value={formValues.mileage} />
          </InputBox>
        </Flex>
        <Spacing size={10} />

        <Flex align={"center"}>
          <Label>연료 종류</Label>
          <CreatableSelect
            placeholder="연료"
            name="fuelType"
            id="fuelType"
            onChange={(newValue) => setFuelType(newValue)}
            options={CAR_OPTION_FUELTYPE}
            value={fuelType}
            styles={selectStyle}
          />
          <Spacing size={20} direction={"width"} />

          <Label>변속기 종류</Label>
          <CreatableSelect
            placeholder="변속기"
            name="transmission"
            onChange={(newValue) => setTransmission(newValue)}
            options={CAR_OPTION_TRANSMISSION}
            value={transmission}
            styles={selectStyle}
          />
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>차량 색상</Label>
          <CarColorList color={color} setColor={setColor} />
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>활성화 여부</Label>
          <BaseButton color={isAvailable === 1 ? "success" : "grey"} css={activeBtn} onClick={() => setIsAvailable(1)}>
            판매중
          </BaseButton>
          <Spacing size={10} direction="horizontal" />
          <BaseButton color={isAvailable === 0 ? "error" : "grey"} css={activeBtn} onClick={() => setIsAvailable(0)}>
            판매완료
          </BaseButton>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <Label>차량 상세 설명</Label>
          <TextareaBox>
            <textarea name="description" id="description" onChange={handleFormValues} value={formValues.description} />
          </TextareaBox>
        </Flex>
        <Spacing size={10} />

        <Flex>
          <>
            <Label>현재 첨부파일</Label>
            <ValueRow>{formValues.imageUrl}</ValueRow>
          </>
          <Label>변경 첨부파일</Label>
          <InputBox>
            <input type="file" name="file" onChange={handleFileChange} />
          </InputBox>
        </Flex>
      </Flex>
      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          차량 수정하기
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
    font-size: 12px;
    padding: 10px;
    min-height: 300px;
  }
`;

const InputBox = styled.div`
  height: 35px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 35px;
    font-size: 12px;
    text-align: end;
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

const activeBtn = css`
  height: 40px;
  width: 100%;
`;
