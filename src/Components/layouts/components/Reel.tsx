import React, { ReactNode, useRef, useState } from "react";
import useResize from "react-resize-observer-hook";
import styled, { css } from "styled-components";

type ReelProps = {
  height?: string;
  itemWidth?: string;
  overflowing?: boolean;
  space?: string;
  thumbColor?: string;
  trackColor?: string;
};

const StyledReel = styled.div<ReelProps>`
  display: flex;
  height: ${(props) => props.height};
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-color: ${(props) => props.thumbColor} ${(props) => props.trackColor};

  ::-webkit-scrollbar {
    height: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.trackColor};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.trackColor};
    background-image: linear-gradient(
      ${(props) => props.trackColor} 0,
      ${(props) => props.trackColor} 0.25rem,
      ${(props) => props.thumbColor} 0.25rem,
      ${(props) => props.thumbColor} 0.75rem,
      ${(props) => props.trackColor} 0.75rem
    );
  }

  > * {
    flex: 0 0 ${(props) => props.itemWidth};
  }

  > img {
    height: 100%;
    flex-basis: auto;
    width: auto;
  }

  > * + * {
    margin-left: ${(props) => props.space};
  }

  ${(props) =>
    props.overflowing &&
    css`
      padding-bottom: ${props.space};
    `}
`;

StyledReel.defaultProps = {
  itemWidth: "auto",
  overflowing: false,
  space: "1rem",
  height: "auto",
  trackColor: "#000",
  thumbColor: "#fff",
};

const ReelComp = (props: ReelProps & { children: ReactNode }) => {
  const reelRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(props.overflowing);

  useResize(reelRef, (entry) => {
    const element = reelRef.current;

    if (element) {
      setOverflowing(element.scrollWidth > entry.width);
    }
  });

  return <StyledReel {...props} overflowing={overflowing} ref={reelRef} />;
};

export default ReelComp;
