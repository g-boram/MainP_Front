import styled from "@emotion/styled";
import Text from "./Text";
import { css } from "@emotion/react";

function Badge({ label = "", color = "black" }) {
  return (
    <Container color={color}>
      <Text bold={true} typography="t7">
        {label}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 15px;
  padding: 2px 12px;
  margin-right: 15px;
  height: 22px;

  ${({ color }) => css`
    color: ${color};
    border: 1px solid ${color};
  `}
`;

export default Badge;
