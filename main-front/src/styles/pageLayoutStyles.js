import styled from "@emotion/styled";
import { HEIGHT_LIST } from "../constants/height";

export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding-top: ${HEIGHT_LIST.HEADER + HEIGHT_LIST.NAVBAR}px;
`;
