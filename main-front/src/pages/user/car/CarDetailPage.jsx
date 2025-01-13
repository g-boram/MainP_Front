import CarDetailBox from "../../../components/car/CarDetailBox";
import { PageContainer, PageWrapper } from "../../../styles/pageLayoutStyles";
import styled from "@emotion/styled";

export default function CarDetailPage() {
  return (
    <PageContainer>
      <PageWrapper>
        <CarDetailBox />
      </PageWrapper>
    </PageContainer>
  );
}
