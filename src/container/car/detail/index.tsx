"use client";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const CarDetail: React.FC = () => {
  const router = useRouter(); // Correctly declare router using const
  const { carnumber } = useParams(); // Fetch dynamic route parameter

  // Mock data (this could come from a server or API in a real-world scenario)
  const carInfo = {
    date: "2024-09-17 20:06:39",
    timeSpent: "Оцаг 25мин",
    amountDue: 500,
    discount: 0,
    totalAmount: 500,
  };

  const handleProceedToPayment = () => {
    // Navigate to the payment page
    router.push(`/car/payment/${carnumber}`);
  };

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
      <Card sx={{ width: 400, textAlign: "center" }}>
        {/* Display the image */}
        <Box sx={{ position: "relative", width: "100%", height: 200 }}>
          <Image
            src="/car-parking.jpg" // Replace with the correct image path
            alt="Parking"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        {/* Ticket Information */}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {carnumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {carInfo.date}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginY: 2,
            }}
          >
            <Typography>Хугацаа</Typography>
            <Typography>{carInfo.timeSpent}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography>Төлбөр</Typography>
            <Typography>{carInfo.amountDue}₮</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Typography>Хөнгөлөлт</Typography>
            <Typography>{carInfo.discount}₮</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
              color: "red",
            }}
          >
            <Typography>Төлөх Дүн</Typography>
            <Typography>{carInfo.totalAmount}₮</Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => router.push("/")}
            >
              БУЦАХ
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={handleProceedToPayment}
            >
              ҮРГЭЛЖЛҮҮЛЭХ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarDetail;
