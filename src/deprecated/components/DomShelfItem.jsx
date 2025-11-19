import React from "react";
import { useNavigate } from "react-router-dom";

export default function DomShelfItem({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.route) navigate(item.route);
  };

  return (
    <div
      className="dom-shelf-item"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="shelf-card">
        <img src={item.image} alt={item.alt || item.title} />
      </div>
    </div>
  );
}
