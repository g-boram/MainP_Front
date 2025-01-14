import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Spacing from "../../shared/Spacing";
import Flex from "../../shared/Flex";
import BaseButton from "../../shared/Button";
import CreatableSelect from "react-select/creatable";
import CarColorList from "./CarColorList";

import { colorPalette } from "../../../styles/colorPalette";
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
  const [hashTag, setHashTag] = useState("");
  const [tags, setTags] = useState([]);
  const [currentImg, setCurrentImg] = useState();

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
    eventName: "",
    eventEndTime: "",
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
        eventName: location.state.eventName,
        eventEndTime: location.state.eventEndTime,
      });
      setCarId(location.state.carId);
      setTags(location.state.hashTags);
      setYear({ label: location.state.year, value: location.state.year });
      setColor(location.state.color);
      setFuelType({ label: location.state.fuelType, value: location.state.fuelType });
      setTransmission({ label: location.state.transmission, value: location.state.transmission });
      setIsAvailable(location.state.status === "AVAILABLE" ? 1 : 0);
    }
    setIsLoading(false);
  }, [location.state]);

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

  // 해시태그 입력
  const onChangeHashTag = (e) => {
    setHashTag(e?.target?.value?.trim());
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // 만약 같은 태그가 있다면 에러를 띄운다.
      // 아니라면 태그를 생성해준다.
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("같은 태그가 있습니다.");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
    }
  };
  const removeTag = (tag) => {
    setTags(tags?.filter((val) => val !== tag));
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
      eventName: formValues.eventName,
      eventEndTime: formValues.eventEndTime,
      hashTags: tags ? tags : [],
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

        <Flex width="100%" justify="space-between">
          <Flex width="100%" justify="space-between">
            <Label>현재 첨부파일</Label>
            <>
              <UrlBox>{formValues.imageUrl}</UrlBox>
              <FileBox>
                {formValues.imageUrl ? (
                  <>
                    <img src={formValues.imageUrl} alt="" />
                  </>
                ) : (
                  ""
                )}
              </FileBox>
            </>
          </Flex>
          <Flex width="100%" justify="space-between">
            <Label>수정 첨부파일</Label>
            <FileBox>{currentImg ? <img src={currentImg} alt="" /> : ""}</FileBox>
            <Flex direction="column" justify="flex-end">
              <input type="file" name="file" onChange={handleUploadFile} />
              <Spacing size={10} />
              <BaseButton size="small" color="black" height={"30px"} width={"100px"} onClick={handleRemoveFile}>
                파일 삭제
              </BaseButton>
            </Flex>
          </Flex>
        </Flex>
        <Spacing size={30} />

        <Flex width="100%">
          <Label>이벤트</Label>
          <Flex width="100%">
            <EventInput>
              <label htmlFor="eventEndTime">이벤트 이름</label>
              <input id="eventName" name="eventName" value={formValues.eventName} onChange={handleFormValues} />
            </EventInput>
            <Spacing size={20} direction={"width"} />
            <EventInput>
              <label htmlFor="eventEndTime">이벤트 종료시간</label>
              <input
                type="datetime-local"
                id="eventEndTime"
                name="eventEndTime"
                value={formValues.eventEndTime}
                onChange={handleFormValues}
              />
            </EventInput>
          </Flex>
        </Flex>
        <Spacing size={20} />

        <Flex>
          <Label># 해시태그</Label>
          <Flex direction="column" height="120px" width="100%">
            <HashTagForm>
              {tags?.map((tag, index) => (
                <Tags key={index} onClick={() => removeTag(tag)}>
                  # {tag}
                </Tags>
              ))}
            </HashTagForm>
            <Flex>
              <TagInput
                id="hashtag"
                name="hashtag"
                placeholder="해시태그 + 스페이스바 = 입력 / 삭제는 해시태그 클릭"
                onChange={onChangeHashTag}
                onKeyUp={handleKeyUp}
                value={hashTag}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Spacing size={50} />
      <Flex justify={"center"}>
        <BaseButton size="medium" color="black" height={"40px"} full onClick={confirmCreate}>
          차량 수정하기
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
  z-index: 1;
`;

const UrlBox = styled.div`
  width: 120px;
  font-size: 11px;
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
`;

const activeBtn = css`
  height: 40px;
  width: 100%;
`;

const EventInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > label {
    font-size: 12px;
    width: 200px;
    text-align: end;
    margin-right: 10px;
  }

  & input {
    border: 1px solid #eee;
    width: 100%;
    padding: 0 10px;
    height: 30px;
    font-size: 12px;
    text-align: end;
  }
`;

const TagInput = styled.input`
  border: 1px solid #eee;
  width: 100%;
  font-size: 12px;
  padding-left: 10px;
  height: 35px;
`;
const Tags = styled.div`
  border: 1px solid #444;
  font-size: 12px;
  border-radius: 15px;
  padding: 5px 12px;
  width: max-content;
  height: max-content;
  margin-right: 5px;
`;
const HashTagForm = styled.div`
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  height: auto;
  min-height: 80px;
  margin-bottom: 10px;
  width: 100%;
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
