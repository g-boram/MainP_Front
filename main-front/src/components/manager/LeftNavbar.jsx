import styled from "@emotion/styled";

import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";

export default function LeftNavbar() {
  return (
    <NavContainer>
      <StyledLink to="/manager/board">공지사항</StyledLink>
      <StyledLink to="/manager">Nav 1</StyledLink>
      <StyledLink to="/manager">Nav 2</StyledLink>
      <StyledLink to="/manager">Nav 3</StyledLink>
      <StyledLink to="/manager">Nav 4</StyledLink>
      <StyledLink to="/manager">Nav 5</StyledLink>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 280px;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: black;
  color: ${colorPalette.fontWhite};
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
