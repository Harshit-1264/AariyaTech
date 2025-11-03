import React from "react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fee2e2",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#dc2626", marginBottom: "1rem" }}>
        Payment Cancelled!
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#374151" }}>
        Your payment was not completed.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "1.5rem",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#dc2626",
          color: "white",
          textDecoration: "none",
        }}
      >
        Try Again
      </Link>
    </div>
  );
}
