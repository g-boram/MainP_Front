/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import { Z_INDEX_LIST } from "../../constants/zIndex";
import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <Flex justify="space-between">
        <div>Header</div>
        <div>
          <StyledLink to="/signin">로그인</StyledLink>
          <StyledLink to="/signup">회원가입</StyledLink>
        </div>
      </Flex>
      <NavbarContainer>
        <StyledLink to="/">Nav1</StyledLink>
        <StyledLink to="/">Nav2</StyledLink>
        <StyledLink to="/">Nav3</StyledLink>
        <StyledLink to="/">Nav4</StyledLink>
        <StyledLink to="/">상품</StyledLink>
      </NavbarContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  color: ${colorPalette.fontWhite};
  z-index: ${Z_INDEX_LIST.HEADER};
  background-color: ${colorPalette.headerBG};
  position: fixed;
`;

const NavbarContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  color: ${colorPalette.fontWhite};
  background-color: ${colorPalette.navbarBG};
`;

const StyledLink = styled(Link)`
  color: #eee;
  font-weight: bold;
  margin: 0px 10px;
  cursor: pointer;
  text-decoration: none;

  &: hover {
    color: white;
  }
`;
