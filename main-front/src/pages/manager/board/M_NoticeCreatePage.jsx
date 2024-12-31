import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import NoticeForm from "../../../components/manager/board/NoticeForm";
import HeadTitle from "../../../components/manager/HeadTitle";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "./layoutStyles";
import LinkButton from "../../../components/shared/LinkButton";

export default function M_NoticeCreatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <HeadTitle title={"공지사항 등록"} desc={"공지사항 게시글 등록하기 "}></HeadTitle>
        <NavRow>
          <LinkButton
            to="/manager/board/notice"
            color="white"
            bgColor="black"
            text="게시글 목록"
            width="100px"
            height="25px"
            fontSize="14px"
          />
        </NavRow>
        <ContentBox>
          <NoticeForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
