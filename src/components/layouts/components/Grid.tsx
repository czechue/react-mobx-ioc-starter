import React from "react";
import styled, { css } from "styled-components";

import { theme } from "../../../core/styles/theme";

type GridProps = {
  min?: string;
  space?: string;
};

const StyledGrid = styled.div<GridProps>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.space};

  ${(props) => css`
    @supports (width: min(${props.min}, 100%)) {
      /* ↓ Enhance with the min() function
				into multiple columns */
      grid-template-columns: repeat(
        auto-fit,
        minmax(min(${props.min}, 100%), 1fr)
      );
    }
  `}
`;

const Grid = (props: GridProps) => {
  return <StyledGrid {...props} />;
};

Grid.defaultProps = {
  min: "250px",
  space: theme.space.s1,
};

export default Grid;
