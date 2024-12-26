import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Flex from "../../components/shared/Flex";
import Text from "../../components/shared/Text";
import Form from "../../components/signup/Form";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContext";
import axios from "axios";
import { SERVER_URL } from "../../constants/urlList";
import SignUpImg from "../../assert/signupCar.png";

// 회원가입 페이지
export default function SignupPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleSubmit = async (formValues) => {
    const { email, password, username, phoneNumber, year, month, day, gender } = formValues;

    try {
      const newUser = {
        email: email,
        password: password,
        username: username,
        phoneNumber: phoneNumber,
        gender: gender,
        photoURL: "",
        birth: `${year + month + day}`,
      };

      const res = await axios.post(`${SERVER_URL.LOCAL}/auth/register`, newUser);

      alert("회원가입이 완료되었습니다!");

      navigate("/signin");
    } catch (e) {
      console.error("Error creating User:", e);
      alert("Failed to create the User. Please try again.");

      if (e) {
        if (e.code === "auth/invalid-credential") {
          open({
            title: "입력한 정보를 다시 확인해주세요",
            isCancle: false,
            onCancleClick: () => {},
            onButtonClick: () => {},
          });
          return;
        }
        if (e.code === "auth/email-already-in-use") {
          open({
            title: "이미 가입된 이메일 입니다.",
            isCancle: false,
            onCancleClick: () => {},
            onButtonClick: () => {},
          });
          return;
        }
      }
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
