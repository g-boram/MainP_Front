import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/urlList";
import { useAlertContext } from "../../contexts/AlertContext";
import styled from "@emotion/styled";
import Form from "../../components/signin/Form";
import axios from "axios";
import SignInImg from "../../assert/signinCar.png";

// 로그인 페이지
export default function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formValues) => {
      const { email, password } = formValues;

      try {
        const response = await axios.post(`${SERVER_URL.LOCAL}/auth/login`, {
          email,
          password,
        });

        const token = response.data.token;
        localStorage.setItem("jwtToken", token); // 토큰을 localStorage에 저장

        alert("00님 로그인 성공!");
        // navigate(-1)
      } catch (e) {
        console.log("err : ", e);
        alert("Invalid credentials");

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
        }

        // 일반적인 에러
        open({
          title: "잠시 후 다시 시도해주세요.",
          isCancle: false,
          onCancleClick: () => {},
          onButtonClick: () => {},
        });
      }
    },
    [open]
  );

  //     try {
  //       const res = await axios.post(`${SERVER_URL.LOCAL}/auth/login`, loginUser);
  //       alert("00님 로그인 성공!");
  //       // navigate(-1)
  //     } catch (e) {
  //       console.log("err : ", e);
  //       // firebase 의 에러
  //       if (e) {
  //         if (e.code === "auth/invalid-credential") {
  //           open({
  //             title: "입력한 정보를 다시 확인해주세요",
  //             isCancle: false,
  //             onCancleClick: () => {},
  //             onButtonClick: () => {},
  //           });
  //           return;
  //         }
  //       }
  //       // 일반적인 에러
  //       open({
  //         title: "잠시 후 다시 시도해주세요.",
  //         isCancle: false,
  //         onCancleClick: () => {},
  //         onButtonClick: () => {},
  //       });
  //     }
  //   },
  //   [open]
  // );

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
