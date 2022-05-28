import { ReactNode } from "react";
import styled from "styled-components";

import { theme } from "../../../styles/theme";

type SwitcherProps = {
  limit: number;
  space?: string;
  threshold?: string;
};

const Switcher = styled.div<SwitcherProps>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.space};

  > * {
    flex-basis: calc((${(props) => props.threshold} - 100%) * 999);
    flex-grow: 1;
  }

  /* second element twice as wide as its siblings
  > :nth-child(2) {
    flex-grow: 2;
  } 
  */

  > :nth-last-child(n + ${(props) => props.limit! + 1}),
  > :nth-last-child(n + ${(props) => props.limit! + 1}) ~ * {
    flex-basis: 100%;
  }
`;

Switcher.defaultProps = {
  limit: 4,
  space: theme.space.s1,
  /* ↓ The width at which the layout “breaks” */
  // using smaller space here will result in additional state
  threshold: theme.space.measure,
};

const SwitcherComp = (props: SwitcherProps & { children: ReactNode }) => (
  <Switcher {...props}>{props.children}</Switcher>
);

export default SwitcherComp;
