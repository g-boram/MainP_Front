import styled from "@emotion/styled";
import { css } from "@emotion/react";

// 회원가입 페이지
export default function SignupPage() {
  return (
    <SignupContainer>
      <h1>Signup Page</h1>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: yellow;
`;
