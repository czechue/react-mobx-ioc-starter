import { ReactNode } from "react";
import styled, { css } from "styled-components";

import { theme } from "../../../core/styles/theme";

type StackProps = {
  recursive?: boolean;
  splitAfter?: number;
  space?: string;
};

const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  ${(props) => (props.recursive ? "" : ">")} * + * {
    margin-top: ${(props) => props.space};
  }

  ${({ splitAfter }) =>
    splitAfter
      ? css`
          > :nth-child(${splitAfter}) {
            margin-bottom: auto;
          }
        `
      : ""}
`;

Stack.defaultProps = {
  recursive: false,
  space: theme.space.s1,
};

const StackComp = (props: StackProps & { children: ReactNode }) => (
  <Stack {...props}>{props.children}</Stack>
);

export default StackComp;
