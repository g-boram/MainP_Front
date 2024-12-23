import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Flex from "../../components/shared/Flex";
import Text from "../../components/shared/Text";
import Form from "../../components/signin/Form";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../constants/urlList";
import axios from "axios";
import { useAlertContext } from "../../contexts/AlertContext";

// 로그인 페이지
export default function SigninPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formValues) => {
      const { email, password } = formValues;

      try {
        const response = await axios.post("http://localhost:8080/auth/login", {
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
      <ImgBox>
        <Flex justify="center" align="center" css={formTitle}>
          <Text typography="t1">로그인</Text>
        </Flex>
        <img src={"https://cdn.pixabay.com/photo/2021/02/26/11/51/cosmetics-6051633_1280.jpg"} alt="signin" />
      </ImgBox>
      <FormBox>
        {/* <Form /> */}
        <Form onSubmit={handleSubmit} />
      </FormBox>
    </SigninContainer>
  );
}

const SigninContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 600px) {
    gap: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 150px;
  }
  @media (min-width: 600px) {
    gap: 10px;
    width: 50%;
  }
`;

const ImgBox = styled.div`
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  padding: 10px;

  & > img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    height: 150px;
    width: 96%;
    padding: 10px;
    margin-top: 0px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media (min-width: 600px) {
    margin-top: 160px;
    width: 40%;
  }
`;

const FormBox = styled.div`
  padding: 50px 20px 20px 20px;
  height: auto;
  flex-grow: 1;

  @media (max-width: 600px) {
    padding: 20px;
    width: 90%;
  }
`;

const formTitle = css`
  flex-shrink: 0;
  height: 100px;

  @media (max-width: 600px) {
    height: 60px;
  }
`;
