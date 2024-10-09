"use client";
import { useRouter, useParams } from "next/navigation";
import { Button, Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Payment: React.FC = () => {
  const router = useRouter();
  const { carnumber } = useParams(); // Get the car number from the URL

  const handlePaymentSelection = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    // Handle the selected payment method here
    // For now, it will just log the selected method
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
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Төлбөр төлөх
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: 3 }}>
            Төлбөрийн төрлөө сонгоно уу
          </Typography>

          {/* Payment options with small images */}
          <Button
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2, justifyContent: "flex-start" }} // Align items to the start
            startIcon={
              <Image
                src="/images/qpaylogo.jpeg" // Correct path
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
            sx={{ marginBottom: 2, justifyContent: "flex-start" }} // Align items to the start
            startIcon={
              <Image
                src="/images/bankcardlogo.png" // Correct path
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
            sx={{ marginBottom: 2, justifyContent: "flex-start" }} // Align items to the start
            startIcon={
              <Image
                src="/images/socialpaylogo.jpg" // Correct path
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
            sx={{ marginBottom: 2, justifyContent: "flex-start" }} // Align items to the start
            startIcon={
              <Image
                src="/images/monpaylogo.jpg" // Correct path
                alt="MonPay"
                width={24}
                height={24}
              />
            }
            onClick={() => handlePaymentSelection("MonPay")}
          >
            MonPay
          </Button>

          {/* Action buttons */}
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
              onClick={() => router.back()}
            >
              БУЦАХ
            </Button>
            <Button variant="contained" color="warning">
              ҮРГЭЛЖЛҮҮЛЭХ
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payment;
