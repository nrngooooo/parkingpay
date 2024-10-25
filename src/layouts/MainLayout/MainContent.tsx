import Header from "@/layouts/header";
import { Box } from "@mui/material";
import React from "react";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
      }}
    >
      <Header />
      {children}
    </Box>
  );
};

export default MainContent;
