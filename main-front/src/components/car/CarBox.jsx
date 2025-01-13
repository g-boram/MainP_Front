import styled from "@emotion/styled";
import addDelimiter from "../../utils/addDelimiter";
import noCarImg from "../../assert/NotCarBoxImg.png";
import { CAR_OPTION_FUELTYPE } from "../../constants/carOption";
import { colorPalette } from "../../styles/colorPalette";
import { useNavigate } from "react-router-dom";

export default function CarBox(car) {
  const { make, model, fuelType, mileage, price, description, transmission, year, imageUrl } = car;

  const navigate = useNavigate();
  const fuel = CAR_OPTION_FUELTYPE.filter((f) => f.value === fuelType);

  return (
    <CarContainer onClick={() => navigate("/car/detail", { state: { ...car } })}>
      <ImgWrapper>{imageUrl ? <img src={imageUrl} alt="carImg" /> : <img src={noCarImg} alt="NocarImg" />}</ImgWrapper>
      <CarWrapper>
        <NameText>
          {make} {model} {fuel[0].label} {transmission}
        </NameText>
        <GreyText>
          <div>{year}(년형)</div>
          <div>{addDelimiter(mileage)}km</div>
          <div>{fuel[0].label}</div>
        </GreyText>
        <DescRow>{description}</DescRow>
        <SaleText>{addDelimiter(price)}</SaleText>
        <PriceText>{addDelimiter(price)} 원</PriceText>
      </CarWrapper>
    </CarContainer>
  );
}

const CarContainer = styled.div`
  width: 250px;
  height: 360px;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  cursor: pointer;
`;

const CarWrapper = styled.div`
  padding: 0 10px;
`;

const ImgWrapper = styled.div`
  height: 180px;
  width: 250px;
  position: relative;
  background-color: #eee;
  border-radius: 10px;
  margin-bottom: 20px;
  & img {
    border-radius: 10px;
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
`;

const DescRow = styled.div`
  display: flex;
  height: 30px;
  overflow: hidden;
  width: 100%;
  margin: 10px 0;
  font-size: 11px;
  white-space: pre-line;
  color: ${colorPalette.fontGrey};
`;

const NameText = styled.div`
  height: 40px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 600;
  color: ${colorPalette.fontBlack};
`;

const PriceText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${colorPalette.fontRed};
`;

const SaleText = styled.div`
  font-size: 10px;
  color: ${colorPalette.fontGrey};
  text-decoration: line-through;
`;

const GreyText = styled.div`
  font-size: 11px;
  color: ${colorPalette.fontDarkGrey};
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;
