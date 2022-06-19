import { CSSProperties, ReactNode } from "react";
import styled from "styled-components";

import { theme } from "../../../styles/theme";

type BoxProps = {
  borderWidth?: string;
  invert?: boolean;
  padding?: string;
  style?: CSSProperties;
};

const Box = styled.div<BoxProps>`
  ${(props) =>
    props.invert
      ? `
    background-color: ${theme.color.primaryLight};
    filter: invert(100%);`
      : ""}

  background-color: inherit;
  border-width: ${({ borderWidth }) => borderWidth};
  border: ${(props) => props.borderWidth} solid;
  display: block;
  padding: ${(props) => props.padding};

  /* ↓ For high contrast mode */
  outline: ${({ theme }) => theme.border.thin} solid transparent;
  outline-offset: ${({ theme }) => `-${theme.border.thin}`};
`;

Box.defaultProps = {
  borderWidth: theme.space.s_5,
  invert: false,
  padding: theme.space.s1,
};

const BoxComp = (props: BoxProps & { children: ReactNode }) => (
  <Box {...props} style={props.style}>
    {props.children}
  </Box>
);

export default BoxComp;
