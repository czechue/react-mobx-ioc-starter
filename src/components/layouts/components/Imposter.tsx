import { ReactNode } from "react";
import styled from "styled-components";

type ImposterProps = {
  breakout?: boolean;
  margin?: string;
  fixed?: boolean;
};

const Imposter = styled.div<ImposterProps>`
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Contents */
  --margin: ${(props) => props.margin};
  overflow: auto;
  max-height: calc(100% - (var(--margin) * 2));
  max-width: calc(100% - (var(--margin) * 2));
`;

Imposter.defaultProps = {
  breakout: false,
  margin: "0",
  fixed: false,
};

const ImposterComp = (props: ImposterProps & { children: ReactNode }) => (
  <Imposter {...props}>{props.children}</Imposter>
);

export default ImposterComp;
