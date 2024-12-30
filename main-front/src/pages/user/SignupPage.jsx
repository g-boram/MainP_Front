import { registerUser } from "../../api/authService";
import { useAlertContext } from "../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SignUpImg from "../../assert/signupCar.png";
import Text from "../../components/shared/Text";
import Form from "../../components/signup/Form";
import styled from "@emotion/styled";

// 회원가입 페이지
export default function SignupPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formValues) => {
    const { email, password, username, phoneNumber, year, month, day, gender } = formValues;

    const newUser = {
      email: email,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
      gender: gender,
      photoURL: "",
      birth: `${year + month + day}`,
    };

    try {
      setIsLoading(true);
      await registerUser(newUser);

      open({
        title: "회원가입 성공",
        description: `${username}님, 환영합니다!`,
        isCancel: false,
        onButtonClick: () => {
          navigate("/signin");
        },
      });
    } catch (e) {
      console.error("Error creating User:", e);
      open({
        title: "회원가입 실패",
        description: "관리자에게 문의하세요.",
        isCancel: false,
        onButtonClick: () => {},
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignupContainer>
      <ImgBox>
        <TitleBox>
          <Text typography="t1">Register</Text>
          <Text typography="t3">Desc-1</Text>
          <Text typography="t7">Desc-2</Text>
          <Text typography="t7">Desc-3</Text>
          <Text typography="t7">Desc-4</Text>
        </TitleBox>
        <img src={SignUpImg} alt="signup" />
      </ImgBox>
      <FormWrapper>
        <Form onSubmit={handleSubmit} />
      </FormWrapper>
    </SignupContainer>
  );
}

// 넓은 화면: min
// 모바일 화면: max
const SignupContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 600px) {
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ImgBox = styled.div`
  flex-grow: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & > img {
    width: 400px;
    height: 400px;
  }
`;

const TitleBox = styled.div`
  width: 100%;
  padding-right: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 600px) {
    margin-top: 100px;
    padding-right: 20px;
  }
`;

const FormWrapper = styled.div`
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 50px;
  }
`;
