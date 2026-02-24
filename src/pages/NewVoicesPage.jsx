import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";
import ProjectLayout from "../components/ProjectLayout";

export default function NewVoicesPage() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = React.useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Get New Voices data from projects.json
  const frontendShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "frontend",
  );
  const newVoicesData = frontendShelf?.items?.find(
    (item) => item.id === "newvoices",
  );

  if (!newVoicesData) {
    return <div>Project not found</div>;
  }

  // Handle mouse move to follow cursor
  const handleMouseMove = (e, label) => {
    if (label) {
      setTooltip({
        show: true,
        text: label,
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", x: 0, y: 0 });
  };

  // ESC key navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="project-single-column">
      <h1 className="project-title">{newVoicesData.title}</h1>
      <div className="project-tags">
        {newVoicesData.tags &&
          newVoicesData.tags.map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
      </div>
      <div className="project-description">
        <p>{newVoicesData.description}</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          margin: "2rem 0",
          width: "100%",
        }}
      >
        {[newVoicesData.image, ...(newVoicesData.extraImages || [])].map(
          (imgSrc, idx) => {
            const label = idx === 0 ? "After Redesign" : "Before Redesign";
            return (
              <img
                key={imgSrc}
                src={`${import.meta.env.BASE_URL}${imgSrc}`}
                alt={label}
                loading="lazy"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                }}
                onMouseMove={(e) => handleMouseMove(e, label)}
                onMouseLeave={handleMouseLeave}
              />
            );
          },
        )}
      </div>
      {tooltip.show && (
        <div
          className="image-tooltip"
          style={{
            left: `${tooltip.x + 15}px`,
            top: `${tooltip.y + 15}px`,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
