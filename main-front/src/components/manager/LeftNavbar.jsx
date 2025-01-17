import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import Text from "../shared/Text";
import Badge from "../shared/Badge";
import Spacing from "../shared/Spacing";

import { colorPalette } from "../../styles/colorPalette";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { formatPhoneNumber } from "../../utils/formatNumber";

export default function LeftNavbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <NavContainer>
      <ImgBox>{user.imageUrl ? <img src={user.imageUrl} alt="user" /> : <FaUsersGear size={80} />}</ImgBox>
      <UserInfoBox>
        <Flex justify="center">
          <Badge label={user.role} color={"#000"} />
        </Flex>
        <Spacing size={10} />
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Name.
          </Text>
          <Text typography="t11" color="#fff">
            {user.username}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Phone.
          </Text>
          <Text typography="t11" color="#fff">
            {formatPhoneNumber(user.phone)}
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text typography="t11" color="#fff">
            Email.
          </Text>
          <Text typography="t11" color="#fff">
            {user.email}
          </Text>
        </Flex>
      </UserInfoBox>
      <LinkMenuBox>
        <StyledLink to="/manager/users">회원 관리</StyledLink>
        <StyledLink to="/manager/board/notice">공지사항 관리</StyledLink>
        <StyledLink to="/manager/car">자동차 관리</StyledLink>
        <StyledLink to="/manager/repair">정비소</StyledLink>
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
  width: 200px;
  padding: 0 10px;
  height: 100vh;
  display: flex;
  position: fixed;
  flex-shrink: 0;
  z-index: 10;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  background-color: black;
  color: ${colorPalette.fontBlack};
`;

const UserInfoBox = styled.div`
  width: 100%;
  height: 100px;
`;

const ImgBox = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #eee;
  background-color: #fff;
`;
const LinkMenuBox = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BottomLinkBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  cursor: pointer;

  :hover {
    color: grey;
  }
`;
