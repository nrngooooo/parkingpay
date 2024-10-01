import theme from "@/themes";
import { Box, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Box
      sx={{
        height: 200,
        bgcolor: theme.palette.custom.black,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          textTransform: "uppercase",
          background: `linear-gradient(180deg, ${theme.palette.custom.blue}, ${theme.palette.custom.indigo})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
        }}
      >
        Зогсоолын төлбөр төлөх
      </Typography>
    </Box>
  );
};

export default Header;
