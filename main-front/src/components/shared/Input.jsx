import { colorPalette } from "../../styles/colorPalette";
import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0 16px;
  font-size: 12px;
  height: 40px;
  font-weight: 500;
  border: 1px solid ${colorPalette.inputGrey};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colorPalette.blue};
  }

  &[aria-invalid="true"] {
    border-color: ${colorPalette.red};
  }
`;

export default Input;
