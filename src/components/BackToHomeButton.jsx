import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackToHomeButton.css";

export default function BackToHomeButton() {
  const navigate = useNavigate();

  return (
    <button
      className="back-to-home-button"
      onClick={() => navigate("/")}
      aria-label="Back to home"
    >
      ★
    </button>
  );
}
