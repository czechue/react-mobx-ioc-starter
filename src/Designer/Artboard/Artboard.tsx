import { ReactNode } from "react";

import { Box, Cover } from "../../Components/layouts";

export const Artboard = ({ children }: { children: ReactNode }) => {
  return <Cover centered="article">{children}</Cover>;
};

const ArtboardRow = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const ArtboardMiddle = ({ children }: { children: ReactNode }) => {
  return (
    <article style={{ display: "flex", justifyContent: "space-between" }}>
      {children}
    </article>
  );
};

const ArtboardColumn = ({
  children,
  width,
}: {
  children: ReactNode;
  width: string;
}) => {
  return (
    <Box>
      <div style={{ height: "600px", width: width }}>{children}</div>
    </Box>
  );
};

Artboard.Row = ArtboardRow;
Artboard.Middle = ArtboardMiddle;
Artboard.Column = ArtboardColumn;
