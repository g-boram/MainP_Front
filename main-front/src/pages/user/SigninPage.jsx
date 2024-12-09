import styled from "@emotion/styled";
import { css } from "@emotion/react";

// 로그인 페이지
export default function SigninPage() {
  return (
    <SigninContainer>
      <h1>Signin Page</h1>
    </SigninContainer>
  );
}

const SigninContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: green;
`;
