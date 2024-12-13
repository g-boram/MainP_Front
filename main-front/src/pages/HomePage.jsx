import styled from "@emotion/styled";

// 메인 페이지
// : 누구나 볼수있음
export default function HomePage() {
  return (
    <>
      <HomeContainer>
        <h1>Home Page</h1>
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`;
