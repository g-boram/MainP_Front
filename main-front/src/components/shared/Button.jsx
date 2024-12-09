import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { buttonColorMap, buttonWeakMap, buttonSizeMap } from "@styles/button";

const BaseButton = styled.button(
  {
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  ({ color = "primary", weak }) => (weak ? buttonWeakMap[color] : buttonColorMap[color]),
  ({ size = "small" }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined
);

export default BaseButton;
