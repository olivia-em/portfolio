import React from "react";
import "./BackToHomeButton.css";

export default function BackToHomeButton({ onClick }) {
  return (
    <button
      className="back-to-home-button"
      onClick={onClick}
      aria-label="Back to home"
    >
      ★
    </button>
  );
}
