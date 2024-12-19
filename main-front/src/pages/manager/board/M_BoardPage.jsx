import styled from "@emotion/styled";
import LeftNavbar from "../../../components/manager/LeftNavbar";
import BoardForm from "../../../components/manager/board/BoardForm";

export default function M_BoardPage() {
  return (
    <ManagerContainer>
      <LeftNavbar />
      <ContentWrapper>
        <h1>M_BoardPage</h1>
        <BoardForm />
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
