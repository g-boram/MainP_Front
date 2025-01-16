import styled from "@emotion/styled";
import BaseButton from "../../shared/Button";
import Spacing from "../../shared/Spacing";
import CreatableSelect from "react-select/creatable";
import CarColorList from "./CarColorList";
import { useState } from "react";
import { getFilterCarList } from "../../../api/carApi";
import { IoMdSearch } from "react-icons/io";
import { colorPalette } from "../../../styles/colorPalette";
import {
  CAR_F_FUELTYPE,
  CAR_F_MILEAGE,
  CAR_F_PRICE,
  CAR_F_TRANSMISSION,
  CAR_F_YEARS,
} from "../../../constants/carOption";

export default function CarFilterRow({ setIsLoading, setCarData }) {
  const [isAvailable, setIsAvailable] = useState(1);
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [filters, setFilters] = useState({
    make: "",
    model: "",
  });

  const handleReset = () => {
    setYear("");
    setColor("");
    setFuelType("");
    setTransmission("");
    setPrice("");
    setFilters({ make: "", model: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async () => {
    const [minPrice, maxPrice] = price ? price.value.split("-") : [null, null];
    const [minMileage, maxMileage] = mileage ? mileage.value.split("-") : [null, null];
    const data = {
      color,
      minPrice,
      maxPrice,
      minMileage,
      maxMileage,
      year: year.value,
      fuelType: fuelType.value,
      transmission: transmission.value,
      status: isAvailable ? "AVAILABLE" : "SOLD",
      ...filters,
    };
    console.log("filter: ", data);
    setIsLoading(true);
    try {
      const response = await getFilterCarList(data);
      setCarData(response.data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectStyle = {
    container: (containerStyles) => ({
      ...containerStyles,
      width: "150px",
      fontSize: "12px",
      borderRadius: 0,
      border: "none",
    }),
    control: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
      border: "none",
    }),
    menu: (controlStyles) => ({
      ...controlStyles,
      borderRadius: 0,
    }),
  };
  return (
    <CarFilterWrapper>
      {/* <HeadBox>Car Filter</HeadBox> */}
      <FilterRow>
        <FilterBox>
          <Box />
          <Label>제조사</Label>
          <input name="make" placeholder="Make" value={filters.make} onChange={handleChange} />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>모델명</Label>
          <input name="model" placeholder="Model" value={filters.model} onChange={handleChange} />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>가격</Label>
          <CreatableSelect
            placeholder="전체"
            name="price"
            onChange={(newValue) => setPrice(newValue)}
            options={CAR_F_PRICE}
            value={price}
            styles={selectStyle}
          />
        </FilterBox>

        <FilterBox>
          <Box />
          <Label>판매상태</Label>
          <BaseButton
            width="70px"
            height="30px"
            color={isAvailable === 1 ? "success" : "grey"}
            onClick={() => setIsAvailable(1)}
          >
            판매중
          </BaseButton>
          <Spacing size={5} direction="width" />
          <BaseButton
            width="70px"
            height="30px"
            color={isAvailable === 0 ? "error" : "grey"}
            onClick={() => setIsAvailable(0)}
          >
            판매완료
          </BaseButton>
        </FilterBox>
      </FilterRow>
      <Spacing size={10} />

      <FilterRow>
        <FilterBox>
          <Box />
          <Label>연료 종류</Label>
          <CreatableSelect
            placeholder="전체"
            name="fuelType"
            id="fuelType"
            onChange={(newValue) => setFuelType(newValue)}
            options={CAR_F_FUELTYPE}
            value={fuelType}
            styles={selectStyle}
          />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>변속기 종류</Label>
          <CreatableSelect
            placeholder="전체"
            name="transmission"
            onChange={(newValue) => setTransmission(newValue)}
            options={CAR_F_TRANSMISSION}
            value={transmission}
            styles={selectStyle}
          />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>제조 연도</Label>
          <CreatableSelect
            placeholder="전체"
            name="year"
            onChange={(newValue) => setYear(newValue)}
            options={CAR_F_YEARS}
            value={year}
            styles={selectStyle}
          />
        </FilterBox>
        <FilterBox>
          <Box />
          <Label>주행거리</Label>
          <CreatableSelect
            placeholder="단위: km"
            name="mileage"
            onChange={(newValue) => setMileage(newValue)}
            options={CAR_F_MILEAGE}
            value={mileage}
            styles={selectStyle}
          />
        </FilterBox>
      </FilterRow>
      <Spacing size={10} />

      <FilterRow>
        <FilterBox>
          <Box />
          <Label>색상</Label>
          <CarColorList color={color} setColor={setColor} />
        </FilterBox>
        <SearchBtn onClick={handleSearch}>
          <IoMdSearch size={15} />
          <div>Search</div>
        </SearchBtn>
        <Spacing size={5} direction="width" />
        <SearchBtn onClick={handleReset}>
          <div>초기화</div>
        </SearchBtn>
      </FilterRow>
      <Spacing size={20} />
    </CarFilterWrapper>
  );
}

const CarFilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const HeadBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 10px;
  font-size: 19px;
  border-bottom: 1px solid #000;
`;

const FilterRow = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Box = styled.div`
  height: 10px;
  width: 5px;
  background-color: #000;
`;
const Label = styled.div`
  width: 80px;
  text-align: start;
  font-size: 12px;
  color: #000;
  padding-left: 10px;
`;
const FilterBox = styled.div`
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > input {
    height: 30px;
    width: 100px;
    text-align: end;
    padding: 0 10px;
    font-size: 12px;
    border: 1px solid #eee;
  }
`;

const SearchBtn = styled.button`
  height: 35px;
  min-width: 100px;
  padding: 2px 15px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: ${colorPalette.btnBlack};
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: bold;

  :hover {
    font-weight: bold;
    background-color: ${colorPalette.hoverBlack};
  }
`;
