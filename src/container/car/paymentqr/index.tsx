"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import Image from "next/legacy/image";
import { useState } from "react";

const PaymentQR: React.FC<{ amount: number }> = ({ amount }) => {
  const { method } = useParams() as { method: string };
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const getQRImage = (method: string) => {
    switch (method) {
      case "Qpay":
        return "/images/qpay.jpeg";
      case "SocialPay":
        return "/images/socialpay.jpeg";
      case "MonPay":
        return "/images/monpay.jpeg";
      default:
        return "";
    }
  };

  const handleContinue = () => {
    setOpenModal(true);
  };

  const handleConfirmPayment = () => {
    setOpenModal(false);
    alert("Payment confirmed. Please exit the parking lot within 30 minutes.");
    // Handle payment session closure logic here
    router.push("/"); // Redirect to the dashboard or another page
  };

  const qrImage = getQRImage(method || "");

  return (
    <Box
      sx={{ padding: "16px", textAlign: "center", backgroundColor: "#f4f4f4" }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        {method ? `${method} QR код` : "QR код"}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        QR кодыг уншуулна уу.
      </Typography>

      <Card
        sx={{
          display: "inline-block",
          padding: "16px",
          backgroundColor: "#fff",
          boxShadow: 3,
        }}
      >
        <CardContent>
          {qrImage ? (
            <Image
              src={qrImage}
              alt={`${method} QR`}
              width={200}
              height={200}
            />
          ) : (
            <Typography variant="body1">QR код олдсонгүй.</Typography>
          )}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Төлөх дүн: {amount ? `${amount} MNT` : "Төлбөр тодорхойгүй"}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.back()}
          sx={{ marginRight: 2 }}
        >
          Буцах
        </Button>
        <Button variant="contained" color="primary" onClick={handleContinue}>
          Үргэлжлүүлэх
        </Button>
      </Box>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Төлбөр төлсөн эсэхийг шалгана уу
            </Typography>
            <Typography variant="body1" gutterBottom>
              Хэрэв та төлбөр төлсөн бол үргэлжлүүлэх дарж сессийг хаана уу.
            </Typography>
            <Box sx={{ textAlign: "right", marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmPayment}
              >
                Төлбөр төлсөн
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PaymentQR;
