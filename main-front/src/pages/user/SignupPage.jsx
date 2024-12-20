import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Flex from "../../components/shared/Flex";
import Text from "../../components/shared/Text";
import Form from "../../components/signup/Form";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../../contexts/AlertContext";

// 회원가입 페이지
export default function SignupPage() {
  const { open } = useAlertContext();
  const navigate = useNavigate();

  const handleSubmit = (formValues) => {
    const { email, password, username, phoneNumber, year, month, day, gender } = formValues;

    // const { user } = await createUserWithEmailAndPassword(auth, email, password);
    console.log("formValues : ", email, password, username, phoneNumber, year, month, day, gender);
    try {
      const newUser = {
        email: email,
        username: username,
        phoneNumber: phoneNumber,
        gender: gender,
        photoURL: "",
        birth: `${year + month + day}`,
      };
      console.log("newUser : ", newUser);
      //   await updateProfile(user, {
      //     displayName: name,
      //   });
      //   const newUser = {
      //     uid: user.uid,
      //     email: user.email,
      //     displayName: name,
      //     phone: phone,
      //     gender: gender,
      //     photoURL: "",
      //     birth: { year: year, month: month, day: day },
      //   };
      //   await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser);

      // navigate("/signin");
    } catch (e) {
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
        <img src={"https://cdn.pixabay.com/photo/2019/06/02/10/02/mortar-4246084_1280.jpg"} alt="signin" />
      </ImgBox>
      <FormBox>
        <Flex justify="center" align="center" css={formTitle}>
          <Text typography="t1">회원가입</Text>
        </Flex>
        <Form onSubmit={handleSubmit} />
      </FormBox>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
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
    padding-top: 200px;
  }
  @media (min-width: 600px) {
    gap: 10px;
    width: 50%;
  }
`;

const ImgBox = styled.div`
  flex-grow: 0;
  display: flex;
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
