import * as React from "react";
import { ReactNode } from "react";

import { Box, Center, Sidebar } from "../../Components/layouts";

export const DesignerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Center max="100%">
      <Sidebar>{children}</Sidebar>
    </Center>
  );
};

const DesignerLayoutSidebar = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <div style={{ minWidth: "360px", height: "100vh" }}>{children}</div>
    </Box>
  );
};

const DesignerLayoutMain = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ minWidth: "300px" }}>
      <Box borderWidth={"0"}>{children}</Box>
    </div>
  );
};

DesignerLayout.Sidebar = DesignerLayoutSidebar;
DesignerLayout.Main = DesignerLayoutMain;
