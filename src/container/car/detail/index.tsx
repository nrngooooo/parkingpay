import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

// Get the car number from the params directly
const CarDetails = ({ params }: { params: { carNumber: string } }) => {
  const router = useRouter();
  const { carNumber } = params;

  // Simulated car details data
  const carDetails = {
    pictureUrl: "/car-image.png",
    entryTime: "2024-10-09 10:15",
    releaseTime: "2024-10-09 12:30",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Car Details for {carNumber}
      </Typography>

      {/* Display car image */}
      <img
        src={carDetails.pictureUrl}
        alt="Car"
        style={{ width: "300px", marginBottom: "20px" }}
      />

      {/* Display entry and release time */}
      <Typography variant="body1" sx={{ mb: 2 }}>
        Entry Time: {carDetails.entryTime}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Release Time: {carDetails.releaseTime}
      </Typography>

      {/* Back button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/")}
      >
        Back to Search
      </Button>
    </Box>
  );
};

export default CarDetails;
