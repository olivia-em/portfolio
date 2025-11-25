import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";
import BackToHomeButton from "../components/BackToHomeButton";

export default function LessonsInPerspective() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = React.useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Get LIP data from projects.json
  const frontendShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "frontend"
  );
  const lipData = frontendShelf?.items?.find((item) => item.id === "lip");

  if (!lipData) {
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
    <div className="project-detail-root">
      <aside className="project-detail-left">
        <h1 className="project-detail-title">{lipData.title}</h1>

        {lipData.tags && lipData.tags.length > 0 && (
          <div className="project-detail-tags">
            {lipData.tags.map((tag, index) => (
              <span key={index} className="project-detail-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-detail-description">
          <p>{lipData.description}</p>
        </div>

        <div className="project-detail-links">
          {lipData.url?.website && (
            <a
              href={lipData.url.website}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link"
            >
              <span className="project-detail-link-label">Website</span>
              <span>→</span>
            </a>
          )}
          {lipData.url?.repository && (
            <a
              href={lipData.url.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link"
            >
              <span className="project-detail-link-label">Repository</span>
              <span>→</span>
            </a>
          )}
        </div>
      </aside>

      <section className="project-detail-right">
        <div className="project-detail-images">
          <img
            src={`${import.meta.env.BASE_URL}${lipData.image}`}
            alt={lipData.alt}
            onMouseMove={(e) => handleMouseMove(e, lipData.imageLabel)}
            onMouseLeave={handleMouseLeave}
          />
          {lipData.extraImages &&
            lipData.extraImages.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${lipData.title} ${index + 2}`}
                onMouseMove={(e) =>
                  handleMouseMove(e, lipData.extraImageLabels?.[index])
                }
                onMouseLeave={handleMouseLeave}
              />
            ))}
        </div>
      </section>

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

      <BackToHomeButton />
    </div>
  );
}
