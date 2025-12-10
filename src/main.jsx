import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Redirect /portfolio (no trailing slash) to /portfolio/
if (window.location.pathname === "/portfolio") {
  window.location.replace("/portfolio/");
} else {
  // Handle redirect from 404.html for GitHub Pages client-side routing
  const redirectPath = sessionStorage.getItem("redirectPath");
  if (redirectPath) {
    sessionStorage.removeItem("redirectPath");
    window.history.replaceState(null, "", redirectPath);
  }
  const container = document.getElementById("app");
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/portfolio">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
