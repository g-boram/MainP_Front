import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CarDetailForm from "../../../components/manager/car/\bCarDetailForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";
import { useSelector } from "react-redux";
import Flex from "../../../components/shared/Flex";
import Spacing from "../../../components/shared/Spacing";
import BaseButton from "../../../components/shared/Button";

export default function M_CarDetailPage() {
  const { user } = useSelector((state) => state.auth);
  console.log("user", user.role);

  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"차량 상세보기"} desc={"차량 게시글 상세보기 "}></HeadTitle>
          <NavRow>
            <Flex>
              <LinkButton
                to="/manager/car"
                color="white"
                bgColor="black"
                text="상품 목록"
                width="100px"
                height="30px"
                fontSize="12px"
              />
            </Flex>
          </NavRow>
          <CarDetailForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
