import { ReactNode } from "react";
import styled from "styled-components";

import { theme } from "../../../styles/theme";

type CoverProps = {
  centered?: string;
  minHeight?: string;
  noPad?: boolean;
  space?: string;
};

const Cover = styled.div<CoverProps>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => props.minHeight};
  padding: ${({ noPad, space }) => (!noPad ? space : "0px")};

  > * {
    margin-top: ${(props) => props.space};
    margin-bottom: ${(props) => props.space};
  }

  > :first-child:not(${(props) => props.centered}) {
    margin-top: 0;
  }

  > :last-child:not(${(props) => props.centered}) {
    margin-bottom: 0;
  }

  > ${(props) => props.centered} {
    margin-top: auto;
    margin-bottom: auto;
  }
`;

Cover.defaultProps = {
  centered: "h1",
  minHeight: "100vh",
  noPad: false,
  space: theme.space.s1,
};

const CoverComp = (props: CoverProps & { children: ReactNode }) => {
  return <Cover {...props}>{props.children}</Cover>;
};

export default CoverComp;
