import styled from "@emotion/styled";
import ImgSlideBanner from "../components/manager/user/main/ImgSlideBanner";
import CenterToBanner from "../components/manager/user/main/CenterToBanner";

// 메인 페이지
// : 누구나 볼수있음
export default function HomePage() {
  return (
    <HomeContainer>
      <PageWrapper>
        <ImgSlideBanner />
        <CenterToBanner />
      </PageWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 100%;
  width: 100vw;
  /* margin: 0 auto; */
`;

const PageWrapper = styled.div`
  width: 1200px;
  /* margin: 0 auto; */
  display: flex;
  flex-direction: column;
  background-color: #eee;
`;
