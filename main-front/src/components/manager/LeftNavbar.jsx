import styled from "@emotion/styled";

import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";

export default function LeftNavbar() {
  return (
    <NavContainer>
      <ImgBox></ImgBox>
      <LinkMenuBox>
        <StyledLink to="/manager/board">공지사항</StyledLink>
        <StyledLink to="/manager">Nav 1</StyledLink>
        <StyledLink to="/manager">Nav 2</StyledLink>
        <StyledLink to="/manager">Nav 3</StyledLink>
        <StyledLink to="/manager">Nav 4</StyledLink>
        <StyledLink to="/manager">Nav 5</StyledLink>
      </LinkMenuBox>
      <BottomLinkBox>
        <BottomLinkBtn to="/">SITE</BottomLinkBtn>
        <BottomLinkBtn to="/manager">MAIN</BottomLinkBtn>
      </BottomLinkBox>
    </NavContainer>
  );
}

const NavContainer = styled.div`
  width: 280px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: black;
  color: ${colorPalette.fontWhite};
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: pink;
`;
const LinkMenuBox = styled.div`
  width: 100%;
  min-height: 500px;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BottomLinkBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: yellow;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #eee;
  height: 40px;
  font-weight: bold;
  margin: 0px 10px;
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: yellow;
  }
`;

const BottomLinkBtn = styled(Link)`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colorPalette.fontBlack};
  background-color: #fff;
  font-weight: bold;
  border-radius: 50%;
  text-decoration: none;
  border: 1px solid black;
  cursor: pointer;

  :hover {
    color: grey;
  }
`;
