"use client";
import { useQuery, gql } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Image from "next/legacy/image";
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
        payment {
          amount
        }
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

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
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
          Error: {error.message}
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

  const carInfo = data?.carDetails;

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
        padding: 2,
      }}
    >
      <Card
        sx={{ width: "100%", maxWidth: 400, textAlign: "center", boxShadow: 3 }}
      >
        <Box sx={{ position: "relative" }}>
          <Image
            src={
              carInfo.entryPhoto
                ? `${process.env.NEXT_PUBLIC_BACK_END_URL}media/${carInfo.entryPhoto}`
                : "/images/default_car.jpg"
            }
            alt="Car Entry"
            priority
            objectFit="contain"
            width={500}
            height={200}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {carInfo.carPlate}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            {lastSession?.entryTime || "No entry time available"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: 2,
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              paddingY: 1,
            }}
          >
            <Typography variant="body2">Хугацаа:</Typography>
            <Typography variant="body2">
              {lastSession?.duration
                ? `${Math.floor(lastSession.duration / 60)} цаг ${
                    lastSession.duration % 60
                  } минут`
                : "Unknown"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: 1,
            }}
          >
            <Typography variant="body2">Төлбөр:</Typography>
            <Typography variant="body2">
              {lastSession?.payment?.amount
                ? `${lastSession.payment.amount} MNT`
                : "No payment information"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 3,
          width: "100%",
          maxWidth: 400,
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
          ТӨЛБӨР ТӨЛӨХ
        </Button>
      </Box>
    </Box>
  );
};

export default CarDetail;
