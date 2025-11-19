import React from "react";

// Simple TocLine: renders a title and an empty leader span plus an optional
// right-aligned page/number. The visual leader (underline) is provided by CSS.
export default function TocLine({ children, className = "", page = null }) {
  return (
    <span
      className={`toc-line ${className}`}
      style={{ display: "flex", alignItems: "baseline" }}
    >
      <span className="toc-title">{children}</span>
      <span className="toc-leader" aria-hidden />
      {page != null && (
        <span className="toc-page" aria-hidden>
          {page}
        </span>
      )}
    </span>
  );
}
