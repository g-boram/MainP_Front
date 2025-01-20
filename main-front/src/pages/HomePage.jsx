import styled from "@emotion/styled";
import ImgSlideBanner from "../components/manager/user/main/ImgSlideBanner";
import CenterToBanner from "../components/manager/user/main/CenterToBanner";
import { HEIGHT_LIST } from "../constants/height";

// 메인 페이지
// : 누구나 볼수있음
export default function HomePage() {
  return (
    <HomeContainer>
      <PageWrapper>
        <CenterToBanner />
        <ImgSlideBanner />
      </PageWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
`;

const PageWrapper = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  /* background-color: #eee; */
`;
