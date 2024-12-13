import styled from "@emotion/styled";

import { colorPalette } from "../../styles/colorPalette";
import Text from "./Text";
import { css } from "@emotion/react";

function Badge({ label, color }) {
  return (
    <Container
      css={css`
        background-color: ${color ? color : colorPalette.blue};
      `}
    >
      <Text bold={true} typography="t7" color="fontGrey">
        {label}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 12px;
  padding: 3px 10px;
  margin-right: 15px;
`;

export default Badge;
