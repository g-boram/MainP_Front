import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContextProvider";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reduxSlice/authSlice";

import styled from "@emotion/styled";
import Form from "../../components/signin/Form";
import SignInImg from "../../assert/signinCar.png";
import LightDimmed from "../../components/shared/LightDimmed";

// ****************************** //
// 로그인 페이지
// ****************************** //
export default function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      open({
        title: "로그인 성공",
        description: `${user.username} 님, 환영합니다!`,
        onButtonClick: () => {
          navigate("/");
        },
      });
    }

    if (error) {
      // 로그인 실패 시
      open({
        title: "로그인 실패",
        description: error.message || error,
        isCancel: false,
        onButtonClick: () => {},
      });
    }
  }, [user, error, open, navigate]);

  if (isLoading) {
    return (
      <LightDimmed>
        <BarLoader color="#000" z-index={11} cssOverride={{ margin: "0 auto", top: "50%" }} />
      </LightDimmed>
    );
  }

  const handleSubmit = (formValues) => {
    const { email, password } = formValues;
    const req = { email: email, password: password };
    console.log(req);
    // 로그인 액션 디스패치
    dispatch(loginUser({ email, password }));
  };

  return (
    <SigninContainer>
      <TitleBox>Login</TitleBox>
      <FormWrapper>
        <ImgBox>
          <img src={SignInImg} alt="signin" />
        </ImgBox>
        <Form onSubmit={handleSubmit} />
      </FormWrapper>
    </SigninContainer>
  );
}

// 스타일 컴포넌트
const SigninContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
`;

const TitleBox = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

const FormWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 50%;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
  }
`;

const ImgBox = styled.div`
  height: 300px;
  width: 300px;
  margin: 0 auto;

  & > img {
    width: 100%;
    height: 100%;
  }
`;
