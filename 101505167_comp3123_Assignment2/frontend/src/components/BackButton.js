import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)}
      style={{
        backgroundColor: "var(--pink-light)",
        color: "var(--text)",
        borderColor: "var(--pink-dark)",
        borderRadius: "12px",
        fontWeight: "600",
        padding: "8px 16px",
        marginBottom: "20px",
      }}
    >
      ← Back
    </Button>
  );
}

export default BackButton;
