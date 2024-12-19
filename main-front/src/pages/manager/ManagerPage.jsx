import styled from "@emotion/styled";
import LeftNavbar from "../../components/manager/LeftNavbar";

export default function ManagerPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <h1>ManagerPage</h1>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const ManagerContainer = styled.div`
  min-height: 100vh;
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`;
