import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "./layoutStyles";

export default function M_NoticePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <HeadTitle title={"공지사항 목록"} desc={"공지사항 게시글 작업 페이지"}></HeadTitle>
        <ContentBox>
          <NavRow>
            <LinkButton
              to="/manager/board/notice/create"
              color="white"
              bgColor="black"
              text="게시글 등록하기"
              width="120px"
              height="35px"
            />
          </NavRow>
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
