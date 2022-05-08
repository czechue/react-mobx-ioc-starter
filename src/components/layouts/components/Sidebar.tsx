import { ReactNode } from "react";
import styled from "styled-components";

import { theme } from "../../../core/styles/theme";
import selectSpace from "../utils/selectSpace";

type SidebarProps = {
  contentMin?: string;
  noStretch?: boolean;
  side?: "left" | "right";
  sideWidth?: string;
  space?: string;
  wrapReverse?: boolean;
};

const Sidebar = styled.div<SidebarProps>`
  overflow: hidden;

  > * {
    display: flex;
    flex-wrap: ${({ wrapReverse }) => (wrapReverse ? "wrap-reverse" : "wrap")};
    margin: calc(${(props) => selectSpace(props.space!)} / 2 * -1);
    ${(props) => (props.noStretch ? "align-items: flex-start;" : "")}
  }

  > * > * {
    flex-grow: 1;
    ${({ sideWidth }) => (sideWidth ? `flex-basis: ${sideWidth};` : "")}
    margin: calc(${(props) => selectSpace(props.space!)} / 2);
  }

  > * > ${({ side }) => (side !== "left" ? `:first-child` : `:last-child`)} {
    flex-basis: 0;
    flex-grow: 999;
    min-width: calc(
      ${(props) => props.contentMin} - ${(props) => selectSpace(props.space!)}
    );
  }
`;

Sidebar.defaultProps = {
  contentMin: "70%",
  noStretch: false,
  side: "left",
  sideWidth: "",
  space: theme.space.s1,
  wrapReverse: false,
};

const SidebarComp = (props: SidebarProps & { children: ReactNode }) => (
  <Sidebar {...props}>{props.children}</Sidebar>
);

export default SidebarComp;
