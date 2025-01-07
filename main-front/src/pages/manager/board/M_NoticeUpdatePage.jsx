import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import NoticeUpdateForm from "../../../components/manager/board/NoticeUpdateForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_NoticeUpdatePage() {
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
            height="30px"
            fontSize="12px"
          />
        </NavRow>

        <ContentBox>
          <NoticeUpdateForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
