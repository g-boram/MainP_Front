import styled from "@emotion/styled";

import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

export default function LeftNavbar() {
  const { user } = useSelector((state) => state.auth);
  console.log("user : ", user);
  return (
    <NavContainer>
      <ImgBox></ImgBox>
      <LinkMenuBox>
        <StyledLink to="/manager/board/notice">공지사항</StyledLink>
        <StyledLink to="/manager">Nav 1</StyledLink>
        <StyledLink to="/manager">Nav 2</StyledLink>
        <StyledLink to="/manager">Nav 3</StyledLink>
        <StyledLink to="/manager">Nav 4</StyledLink>
        <StyledLink to="/manager">Nav 5</StyledLink>
      </LinkMenuBox>
      <BottomLinkBox>
        <BottomLinkBtn to="/">
          <FaCar size={20} />
          SITE
        </BottomLinkBtn>
        <BottomLinkBtn to="/manager">
          <IoHome size={20} />
          MAIN
        </BottomLinkBtn>
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
  /* border-right: 1px solid #000; */
  color: ${colorPalette.fontBlack};
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 1px solid #eee;
  background-color: #fff;
`;
const LinkMenuBox = styled.div`
  width: 100%;
  min-height: 500px;
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
    color: #fef7bf;
  }
`;

const BottomLinkBtn = styled(Link)`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${colorPalette.fontBlack};
  background-color: #fff;
  font-weight: bold;
  border-radius: 50%;
  text-decoration: none;
  /* border: 1px solid black; */
  cursor: pointer;
  box-shadow: 0px 0px 5px 2px #eee;

  :hover {
    color: grey;
  }
`;
