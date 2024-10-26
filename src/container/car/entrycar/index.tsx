"use client";
import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js"; // Import Tesseract.js for OCR

const VehicleCapture: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [registrationNumber, setRegistrationNumber] = useState<string>("");
  const [captureTime, setCaptureTime] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Set the image URL to display
        const currentTime = new Date().toLocaleString();
        setCaptureTime(currentTime); // Set the capture time

        Tesseract.recognize(reader.result as string, "mon", {
          logger: (info) => console.log(info), // Log the progress of the OCR process
        })
          .then(({ data: { text } }) => {
            // Set the extracted text as the registration number
            const extractedNumber = text.trim();
            setRegistrationNumber(extractedNumber);
          })
          .catch((err) => {
            console.error("OCR error:", err); // Handle any errors during OCR
          });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Тээврийн хэрэгслийн зураг оруулах</h1>
      <input
        type="file"
        accept="image/*" // Accept image files only
        ref={fileInputRef}
        onChange={handleFileChange} // Handle file selection
        style={{ marginBottom: "20px" }}
      />
      {imageUrl && (
        <div>
          <h2>Авто машины зураг:</h2>
          <img
            src={imageUrl}
            alt="Uploaded Vehicle"
            style={{ width: "100%", maxWidth: "600px" }}
          />
          <h3>Улсын дугаар: {registrationNumber}</h3>
          <h4>Орсон цаг: {captureTime}</h4>
        </div>
      )}
    </div>
  );
};

export default VehicleCapture;
