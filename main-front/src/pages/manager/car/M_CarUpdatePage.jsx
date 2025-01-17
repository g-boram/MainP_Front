import LeftNavbar from "../../../components/manager/LeftNavbar";
import HeadTitle from "../../../components/manager/HeadTitle";
import LinkButton from "../../../components/shared/LinkButton";
import CarUpdateForm from "../../../components/manager/car/CarUpdateForm";
import { ContentBox, ContentWrapper, ManagerContainer, NavRow } from "../../../styles/managerLayoutStyles";

export default function M_CarUpdatePage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <ContentBox>
          <HeadTitle title={"상품 차량 수정"} desc={"차량 수정하기"}></HeadTitle>
          <NavRow>
            <LinkButton
              to="/manager/car"
              color="white"
              bgColor="black"
              text="상품 목록"
              width="100px"
              height="40px"
              fontSize="12px"
            />
          </NavRow>
          <CarUpdateForm />
        </ContentBox>
      </ContentWrapper>
    </ManagerContainer>
  );
}
