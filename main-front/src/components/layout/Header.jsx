import styled from "@emotion/styled";
import { Z_INDEX_LIST } from "../../constant/zIndex";
import { colorPalette } from "../../styles/colorPalette";

export default function Header() {
  return <HeaderContainer>Header Change Test</HeaderContainer>;
}

const HeaderContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  padding: 10px;
  justify-content: center;
  color: ${colorPalette.fontWhite};
  z-index: ${Z_INDEX_LIST.HEADER};
  background-color: ${colorPalette.headerBG};
  position: fixed;
`;
