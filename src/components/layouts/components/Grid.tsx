import React, { useRef, useState } from "react";
import useResize from "react-resize-observer-hook";
import styled from "styled-components";

import { theme } from "../../../core/styles/theme";

type GridProps = {
  min: string;
  isWide: boolean;
  space: string;
};

const StyledGrid = styled.div<GridProps>`
  align-content: start;
  display: grid;
  gap: ${(props) => props.space};
  grid-template-columns: ${(props) =>
    props.isWide ? `repeat(auto-fit, minmax(${props.min}, 1fr))` : "100%"};
`;

const Grid = (props: GridProps) => {
  console.log(props);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isWide, setIsWide] = useState(props.isWide);

  useResize(gridRef, () => {
    const element = gridRef.current;

    if (element) {
      const test = document.createElement("div");
      test.style.width = props.min!;
      element.appendChild(test);
      const minToPixels = test.offsetWidth;
      element.removeChild(test);

      setIsWide(element.scrollWidth > minToPixels);
    }
  });

  return <StyledGrid {...props} isWide={isWide} ref={gridRef} />;
};

Grid.defaultProps = {
  min: "250px",
  isWide: false,
  space: theme.space.s1,
};

export default Grid;
