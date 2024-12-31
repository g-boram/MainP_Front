import { useAlertContext } from "../../contexts/AlertContextProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";
import { registerUser } from "../../reduxSlice/registerSlice";

import SignUpImg from "../../assert/signupCar.png";
import Text from "../../components/shared/Text";
import Form from "../../components/signup/Form";
import styled from "@emotion/styled";
import LightDimmed from "../../components/shared/LightDimmed";

// 회원가입 페이지
export default function SignupPage() {
  const { open } = useAlertContext();
  const { message, isLoading, error } = useSelector((state) => state.register);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      open({
        title: "감사합니다!",
        description: `${message}`,
        onButtonClick: () => {
          navigate("/signin");
        },
      });
    }

    if (error) {
      open({
        title: "회원가입 실패",
        description: error.message || error,
        isCancel: false,
        onButtonClick: () => {},
      });
    }
  }, [message, error, open, navigate]);

  if (isLoading) {
    return (
      <LightDimmed>
        <BarLoader color="#000" z-index={11} cssOverride={{ margin: "0 auto", top: "50%" }} />
      </LightDimmed>
    );
  }

  const handleSubmit = (formValues) => {
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

    dispatch(registerUser(newUser));
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  & > img {
    width: 400px;
    height: 400px;
    object-fit: contain;
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
  min-width: 400px;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 50px;
  }
`;
