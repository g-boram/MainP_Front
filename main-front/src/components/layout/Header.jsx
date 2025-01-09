/** @jsxImportSource @emotion/react */

import { Z_INDEX_LIST } from "../../constants/zIndex";
import { colorPalette } from "../../styles/colorPalette";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isManagerPath } from "../../reduxSlice/isManagerPathSlice";
import { HEIGHT_LIST } from "../../constants/height";
import { logout } from "../../reduxSlice/authSlice";

import styled from "@emotion/styled";
import Flex from "../shared/Flex";
import BaseButton from "../shared/Button";
import Spacing from "../shared/Spacing";

export default function Header() {
  const [isPath, setIsPath] = useState(false);
  // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const { user } = useSelector((state) => state.auth);

  const location = useLocation();
  const isManager = useSelector((state) => state.isManagerPath.isManager); // 상태 가져오기
  const dispatch = useDispatch(); // 액션 디스패치

  useEffect(() => {
    const segments = location.pathname.split("/");
    setIsPath(segments[1] === "manager" ? true : false);
  }, [location]);
  dispatch(isManagerPath(isPath));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isManager ? (
        <></>
      ) : (
        <UserHeaderContainer>
          <Flex justify="space-between">
            <div>Header</div>
            <div>
              {user == null ? (
                <Flex>
                  <StyledLink to="/signin">로그인</StyledLink>
                  <StyledLink to="/signup">회원가입</StyledLink>
                </Flex>
              ) : (
                <LoginUserBox>
                  <Flex>
                    <TextRow>{user.username} 님 환영합니다.</TextRow>
                    <BaseButton size="small" color="white" height="30px" width="70px" onClick={handleLogout}>
                      로그아웃
                    </BaseButton>
                    <Spacing size={10} direction="width" />
                    <Link to={`/mypage`}>
                      <BaseButton size="small" color="white" height="30px" width="70px">
                        마이페이지
                      </BaseButton>
                    </Link>
                    <Spacing size={20} direction="width" />
                  </Flex>
                  {user.role === "ADMIN" ? <StyledLink to="/manager">관리자 페이지</StyledLink> : <></>}
                </LoginUserBox>
              )}
            </div>
          </Flex>
          <NavbarContainer>
            <StyledLink to="/">Nav1</StyledLink>
            <StyledLink to="/">Nav2</StyledLink>
            <StyledLink to="/">Nav3</StyledLink>
            <StyledLink to="/car">자동차 목록</StyledLink>
            <StyledLink to="/board/notice">공지사항</StyledLink>
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
  color: ${colorPalette.fontWhite};
  z-index: ${Z_INDEX_LIST.HEADER};
  background-color: ${colorPalette.headerBG};
  margin-bottom: 10px;
  position: fixed;
`;

const NavbarContainer = styled.div`
  width: 100%;
  height: ${HEIGHT_LIST.NAVBAR}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  color: ${colorPalette.fontWhite};
  background-color: ${colorPalette.navbarBG};
`;

const TextRow = styled.div`
  min-width: 100px;
  height: auto;
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  margin-right: 10px;
`;
const LoginUserBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  color: #eee;
  font-weight: bold;
  margin: 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;

  hover {
    color: #bbb;
  }
`;
