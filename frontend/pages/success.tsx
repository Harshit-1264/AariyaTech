import React from "react";
import Link from "next/link";

export default function SuccessPage(){
  return (
    <div 
    style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e6ffed",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2rem", color: "#16a34a", marginBottom: "1rem" }}>
        Payment Successful!
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#374151" }}>
        Thank you for your purchase.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1.5rem",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#16a34a",
          color: "white",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}