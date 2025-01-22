import styled from "@emotion/styled";
import { useSelector } from "react-redux";

export default function Footer() {
  const isManager = useSelector((state) => state.isManagerPath.isManager); // 상태 가져오기

  return <>{isManager ? <></> : <FooterContainer>HeaderChangeTests</FooterContainer>}</>;
}

const FooterContainer = styled.div`
  height: 50px;
  padding: 10px;
  margin-top: 50px;
  background-color: #000;
  color: #fff;
`;
