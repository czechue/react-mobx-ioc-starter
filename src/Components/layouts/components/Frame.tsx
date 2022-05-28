import { ReactNode } from "react";
import styled from "styled-components";

type FrameProps = {
  ratio: string;
};

type RatioArray = [string, string];

function selectRatioArray(ratio: string): RatioArray {
  const ratioParts = ratio.split(":", 2);

  return [ratioParts[0], ratioParts[1]];
}

const Frame = styled.div<FrameProps>`
  display: block;
  aspect-ratio: ${({ ratio }) => {
    const [ratioNumerator, ratioDenominator] = selectRatioArray(ratio);

    return `${ratioNumerator} / ${ratioDenominator}`;
  }};
  position: relative;

  > * {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  > img,
  > video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

Frame.defaultProps = {
  ratio: "6:9",
};

const FrameComp = (props: FrameProps & { children: ReactNode }) => {
  return <Frame {...props}>{props.children}</Frame>;
};

export default FrameComp;
