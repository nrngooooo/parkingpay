"use client";
import { useQuery, useMutation, gql } from "@apollo/client";
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
import React, { useEffect, useState } from "react";

const GET_CAR_DETAILS = gql`
  query GetCarDetails($carPlate: String!) {
    carDetails(carPlate: $carPlate) {
      carPlate
      entryPhoto
      isEmployeeCar
      parkingSessions {
        entryTime
      }
    }
  }
`;

const SAVE_PAYMENT = gql`
  mutation SavePayment($input: SavePaymentInput!) {
    savePayment(input: $input) {
      success
      message
      payment {
        id
        amount
        paymentTime
        duration
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

  const [savePayment] = useMutation(SAVE_PAYMENT);

  const [duration, setDuration] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const entryTime = data.carDetails?.parkingSessions?.[0]?.entryTime;
      if (entryTime) {
        const entryDate = new Date(entryTime);
        const now = new Date();
        const diffInMinutes = Math.floor(
          (now.getTime() - entryDate.getTime()) / 60000
        );
        setDuration(diffInMinutes);

        // Calculate total amount based on duration
        const freeMinutes = 30;
        const ratePerMinute = 10; // Example rate
        const chargeableMinutes = Math.max(0, diffInMinutes - freeMinutes);
        const amount = chargeableMinutes * ratePerMinute;
        setTotalAmount(amount);
      }
    }
  }, [data]);

  const handleProceedToPayment = async () => {
    const paymentTime = new Date().toISOString(); // Current time in ISO format

    try {
      const response = await savePayment({
        variables: {
          input: {
            // Wrapping the fields inside the `input` object
            carPlate: carnumber,
            duration: duration || 0,
            amount: totalAmount,
            paymentTime,
          },
        },
      });

      if (response.data.savePayment.success) {
        router.push(`/car/paymentmethod/${carnumber}`);
      } else {
        alert(response.data.savePayment.message);
      }
    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

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
            Entry Time: {carInfo.parkingSessions?.[0]?.entryTime || "Unknown"}
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
              {duration !== null
                ? `${Math.floor(duration / 60)} цаг ${duration % 60} минут`
                : "Calculating..."}
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
              {totalAmount ? `${totalAmount} MNT` : "Free"}
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
