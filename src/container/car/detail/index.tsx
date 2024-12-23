"use client";
import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const GET_CAR_DETAILS = gql`
  query GetCarDetails($carPlate: String!) {
    carDetails(carPlate: $carPlate) {
      carPlate
      entryPhoto
      isEmployeeCar
      parkingSessions {
        entryTime
        duration
        exitTime
        paidStatus
      }
    }
  }
`;

const CarDetail: React.FC = () => {
  const router = useRouter();
  const { carnumber } = useParams();

  const { loading, error, data } = useQuery(GET_CAR_DETAILS, {
    variables: { carPlate: carnumber },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const carInfo = data?.carDetails;

  // If carInfo is null or undefined, display a message to the user
  if (!carInfo) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Typography variant="h6" color="error">
          No details available for the provided car plate number.
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.back()}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const lastSession =
    carInfo.parkingSessions?.[carInfo.parkingSessions.length - 1];

  const handleProceedToPayment = () => {
    router.push(`/car/paymentmethod/${carnumber}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Card sx={{ width: 400, textAlign: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Image
            src={
              carInfo.entryPhoto
                ? `${process.env.NEXT_PUBLIC_BACK_END_URL}media/${carInfo.entryPhoto}`
                : "/images/default_car.jpg"
            }
            alt="Car Entry"
            objectFit="cover"
            width={500}
            height={200}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {carInfo.carPlate}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {lastSession?.entryTime || "No entry time available"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: 2,
            }}
          >
            <Typography>Хугацаа</Typography>
            <Typography>
              {lastSession?.duration
                ? `${Math.floor(lastSession.duration / 60)}цаг ${
                    lastSession.duration % 60
                  }мин`
                : "Unknown"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography>Төлбөр</Typography>
            <Typography>
              {lastSession?.paidStatus ? "Paid" : "Unpaid"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 3,
          width: "400px",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={() => router.back()}
        >
          БУЦАХ
        </Button>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={handleProceedToPayment}
        >
          ҮРГЭЛЖЛҮҮЛЭХ
        </Button>
      </Box>
    </Box>
  );
};

export default CarDetail;
