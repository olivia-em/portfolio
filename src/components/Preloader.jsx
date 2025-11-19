import React from "react";

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-spinner"></div>
        <p className="preloader-text">Loading...</p>
      </div>
    </div>
  );
}
