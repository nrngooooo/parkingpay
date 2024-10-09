import CarDetails from "@/container/car/detail";
import { Box } from "@mui/material";
import React from "react";

const CarDetailPage = () => {
  return (
    <Box>
      <CarDetails
        params={{
          carNumber: "",
        }}
      />
    </Box>
  );
};

export default CarDetailPage;
