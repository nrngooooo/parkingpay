"use client";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import Image from "next/legacy/image";
import React from "react";

const CarDetail: React.FC = () => {
  const router = useRouter();
  const { carnumber } = useParams();

  const carInfo = {
    date: "2024-09-17 20:06:39",
    timeSpent: "0цаг 35мин",
    amountDue: 500,
    discount: 0,
    totalAmount: 500,
  };

  const handleProceedToPayment = () => {
    router.push(`/car/payment/${carnumber}`);
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
      {/* Card Section */}
      <Card sx={{ width: 400, textAlign: "center" }}>
        <Box sx={{ position: "relative" }}>
          <Image
            src="/images/carimgxmple.jpg"
            alt="Parking"
            objectFit="cover"
            width={500}
            height={200}
          />
        </Box>

        {/* Ticket Information */}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {carnumber}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
            }}
          >
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
              color: "green",
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
        </CardContent>
      </Card>
      {/* Buttons Section: Positioned Outside the Card, Below It */}
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
