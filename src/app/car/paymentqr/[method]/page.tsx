import PaymentQR from "@/container/car/paymentqr";
import React from "react";

const PaymentQrPage = () => {
  const totalAmount = 100; // Define the totalAmount variable
  return <PaymentQR amount={totalAmount} />;
};

export default PaymentQrPage;
