import styled from "@emotion/styled";

// 메인 페이지
// : 누구나 볼수있음
export default function HomePage() {
  return <HomeContainer></HomeContainer>;
}

const HomeContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
