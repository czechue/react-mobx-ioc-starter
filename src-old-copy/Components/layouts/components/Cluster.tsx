import { ReactNode } from "react";
import styled from "styled-components";

import { theme } from "../../../styles/theme";

type ClusterProps = {
  align?: string;
  justify?: string;
  space?: string;
};

const Cluster = styled.div<ClusterProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  gap: ${(props) => props.space};
`;

Cluster.defaultProps = {
  align: "center",
  justify: "flex-start",
  space: theme.space.s1,
};

const ClusterComp = (props: ClusterProps & { children: ReactNode }) => {
  return <Cluster {...props}>{props.children}</Cluster>;
};

export default ClusterComp;
