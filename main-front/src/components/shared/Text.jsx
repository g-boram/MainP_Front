import { colors } from "../../styles/colorPalette";
import { typographyMap } from "../../styles/typography";

import styled from "@emotion/styled";

const Text = styled.span(
  ({ color = "black", display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? "bold" : fontWeight,
  }),
  ({ typography = "t5" }) => typographyMap[typography]
);

export default Text;
