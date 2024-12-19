/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import { Z_INDEX_LIST } from "../../constants/zIndex";
import { colorPalette } from "../../styles/colorPalette";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isManagerPath } from "../../reduxSlice/isManagerPathSlice";
import { HEIGHT_LIST } from "../../constants/height";

export default function Header() {
  const location = useLocation();
  const [isPath, setIsPath] = useState(false);

  const isManager = useSelector((state) => state.isManagerPath.isManager); // 상태 가져오기
  const dispatch = useDispatch(); // 액션 디스패치

  useEffect(() => {
    const segments = location.pathname.split("/");
    setIsPath(segments[1] === "manager" ? true : false);
  }, [location]);

  dispatch(isManagerPath(isPath));

  return (
    <>
      {isManager ? (
        <></>
      ) : (
        <UserHeaderContainer>
          <Flex justify="space-between">
            <div>Header</div>
            <div>
              <StyledLink to="/signin">로그인</StyledLink>
              <StyledLink to="/signup">회원가입</StyledLink>
              <StyledLink to="/manager">관리자 페이지</StyledLink>
            </div>
          </Flex>
          <NavbarContainer>
            <StyledLink to="/">Nav1</StyledLink>
            <StyledLink to="/">Nav2</StyledLink>
            <StyledLink to="/">Nav3</StyledLink>
            <StyledLink to="/car">자동차 목록</StyledLink>
            <StyledLink to="/board">공지사항</StyledLink>
          </NavbarContainer>
        </UserHeaderContainer>
      )}
    </>
  );
}

const UserHeaderContainer = styled.div`
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
  height: ${HEIGHT_LIST.NAVBAR}px;
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

  hover {
    color: white;
  }
`;
