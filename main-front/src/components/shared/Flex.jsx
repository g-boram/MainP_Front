import styled from "@emotion/styled";

const Flex = styled.div(({ align, justify, direction }) => ({
  display: "flex",
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
}));

export default Flex;
