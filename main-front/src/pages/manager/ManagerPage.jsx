import styled from "@emotion/styled";
import LeftNavbar from "../../components/manager/LeftNavbar";
import { ContentWrapper, ManagerContainer } from "../../styles/managerLayoutStyles";

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
