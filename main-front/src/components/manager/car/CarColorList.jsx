import styled from "@emotion/styled";
import { CAR_COLOR } from "../../../constants/carOption";
import { colorPalette } from "../../../styles/colorPalette";
import { css } from "@emotion/react";

export default function CarColorList({ color, setColor }) {
  return (
    <Container>
      {CAR_COLOR.map((color) => (
        <ColorListWrapper>
          <ColorBox key={color.id} bgColor={color.hex} />
          <Name>{color.name}</Name>
          <input name="color" type="radio" onClick={() => setColor(color.hex)} />
        </ColorListWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ColorListWrapper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.div`
  font-size: 11px;
  color: ${colorPalette.fontDarkGrey};
  margin-bottom: 10px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  margin: 10px;

  ${({ bgColor }) =>
    bgColor === "#FFFFFF"
      ? css`
          background-color: ${bgColor};
          border: 1px solid #f4f4f4;
        `
      : css`
          background-color: ${bgColor};
        `};
`;
