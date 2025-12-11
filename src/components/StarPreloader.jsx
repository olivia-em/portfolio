import React from "react";
import styles from "../styles/StarPreloader.module.css";

export default function StarPreloader({ fadingOut }) {
  return (
    <div className={`${styles.overlay} ${fadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.spinner}>
        {/* Use the same star character as the home button, styled in black */}
        <span
          style={{
            color: "#111",
            fontSize: "10vw",
            lineHeight: 1,
            display: "block",
          }}
        >
          ★
        </span>
      </div>
    </div>
  );
}
