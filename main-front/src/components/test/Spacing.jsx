import styled from "@emotion/styled";

// <Spacing size={16} />
//123123
const Spacing = styled.div`
  ${({ size, direction = "vertical" }) =>
    direction === "vertical"
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}
`;

export default Spacing;
