import styled from "@emotion/styled";
import { colorPalette } from "../../styles/colorPalette";

export default function HeadTitle({ title, desc, line }) {
  return (
    <>
      <TitleContainer>
        <TitleWrapper>
          <Title>{title ? title : "title"}</Title>
          <Desc>{desc ? desc : "desc"}</Desc>
        </TitleWrapper>
        <RightWrapper>Right</RightWrapper>
      </TitleContainer>
      {line ? <NoticeLineWrapper></NoticeLineWrapper> : <></>}
    </>
  );
}

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 2px solid black;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${colorPalette.fontBlack};
`;

const Desc = styled.div`
  font-size: 12px;
  color: ${colorPalette.fontGrey};
`;

const RightWrapper = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const NoticeLineWrapper = styled.div`
  height: 30px;
  background-color: yellow;
`;
