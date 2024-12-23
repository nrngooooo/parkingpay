"use client";
import { useRouter, useParams } from "next/navigation";
import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 

const PaymentMethod: React.FC = () => {
  const router = useRouter();
  const { carnumber } = useParams(); 

  const [timeLeft, setTimeLeft] = useState(300); 

  // Timer logic for countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handlePaymentSelection = (method: string) => {
    console.log(`Selected payment method: ${method}`);
  };

  return (
    <>
    <Box
      sx={{
        backgroundColor: "#7D98A1", 
        padding: "16px",
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
        Төлбөр төлөх
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <AccessTimeIcon sx={{ marginRight: 1 }} /> 
        <Typography variant="body1">Үлдсэн хугацаа: {formatTime(timeLeft)}</Typography>
      </Box>
    </Box>

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "70vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center", textTransform: "uppercase" }}>
        Төлбөрийн төрлөө сонгоно уу
      </Typography>
      {/* Payment Card */}
      <Card sx={{ width: 400, textAlign: "center" }}>
        <CardContent>
          {/* Payment Options */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2, justifyContent: "flex-start", borderRadius: "8px" }}
            startIcon={
              <Image
                src="/images/qpaylogo.jpeg"
                alt="Qpay"
                width={24}
                height={24}
              />
            }
            onClick={() => handlePaymentSelection("Qpay")}
          >
            Qpay
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2, justifyContent: "flex-start", borderRadius: "8px" }}
            startIcon={
              <Image
                src="/images/bankcardlogo.png"
                alt="Төлбөрийн картаар"
                width={24}
                height={24}
              />
            }
            onClick={() => handlePaymentSelection("Төлбөрийн картаар")}
          >
            Төлбөрийн картаар
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2, justifyContent: "flex-start", borderRadius: "8px" }}
            startIcon={
              <Image
                src="/images/socialpaylogo.jpg"
                alt="SocialPay"
                width={24}
                height={24}
                />
            }
            onClick={() => handlePaymentSelection("SocialPay")}
          >
            SocialPay
          </Button>

          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2, justifyContent: "flex-start", borderRadius: "8px" }}
            startIcon={
              <Image
                src="/images/monpaylogo.jpg"
                alt="MonPay"
                width={24}
                height={24}
              />
            }
            onClick={() => handlePaymentSelection("MonPay")}
          >
            MonPay
          </Button>
        </CardContent>
      </Card>

      {/* Action Buttons Outside the Card */}
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
          sx={{ borderRadius: "8px" }}
          onClick={() => router.back()}
        >
          БУЦАХ
        </Button>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ borderRadius: "8px" }}
        >
          ҮРГЭЛЖЛҮҮЛЭХ
        </Button>
      </Box>
    </Box>
          </>
  );
};

export default PaymentMethod;
