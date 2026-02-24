import React from "react";

export default function StarIcon({ className = "", style = {}, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="56"
      height="56"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <polygon
        points="24,4 29,18 44,18 32,28 36,42 24,34 12,42 16,28 4,18 19,18"
        fill="rgba(255, 255, 255, 0.5)"
      />
    </svg>
  );
}
