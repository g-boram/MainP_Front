import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";

export default function M_BoardPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <h1>M_BoardPage</h1>
      </ContentWrapper>
    </ManagerContainer>
  );
}

const ManagerContainer = styled.div`
  min-height: 900px;
  padding: 10px;
  display: flex;
  background-color: pink;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  background-color: lightGrey;
`;
