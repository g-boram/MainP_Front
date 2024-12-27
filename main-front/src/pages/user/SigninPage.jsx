import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContextProvider";
import { useEffect, useState } from "react";
import { loginUser } from "../../api/authService";
import styled from "@emotion/styled";
import Form from "../../components/signin/Form";
import SignInImg from "../../assert/signinCar.png";
import { useDispatch, useSelector } from "react-redux";

// 로그인 페이지
export default function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (formValues) => {
    const { email, password } = formValues;
    const req = { email: email, password: password };

    dispatch(loginUser({ email, password }));
    // try {

    //   const res = await loginUser(email, password);
    //   console.log("res : ", res);

    //   open({
    //     title: "로그인 성공",
    //     description: `${email}님, 환영합니다!`,
    //     onButtonClick: () => {
    //       navigate(-1);
    //     },
    //   });
    // } catch (e) {
    //   open({
    //     title: "로그인 실패",
    //     description: `아이디 또는 비밀번호가 올바르지 않습니다.`,
    //     isCancel: false,
    //     onButtonClick: () => {},
    //   });
    // }
  };

  useEffect(() => {
    if (user) {
      // Redirect or show success message
      open({
        title: "로그인 성공",
        description: `${user.username}님, 환영합니다!`,
        onButtonClick: () => {
          navigate(-1); // Navigate to the previous page
        },
      });
    }

    if (error) {
      // Show error message
      open({
        title: "로그인 실패",
        description: error,
        isCancel: false,
        onButtonClick: () => {},
      });
    }
  }, [user, error]); // Run when user or error changes

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

// 넓은 화면: min
// 모바일 화면: max
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
