import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import styles from "../styles/InstallationPage2.module.css";
import projectsData from "../data/projects.json";
import BackToHomeButton from "../components/BackToHomeButton";

const installationShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "installation"
);
const project = installationShelf?.items?.find(
  (item) => item.id === "tinydesk"
);

export default function TinyDeskPage() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = React.useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  // Handle mouse move to follow cursor (if you want image tooltips)
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
        <h1 className="project-detail-title">{project.title}</h1>

        {project.tags && project.tags.length > 0 && (
          <div className="project-detail-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="project-detail-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="project-detail-description">
          <p>{project.description}</p>
        </div>

        <div className="project-detail-links">
          {project.url?.website && project.url.website !== "" && (
            <a
              href={project.url.website}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link"
            >
              <span className="project-detail-link-label">Website</span>
              <span>→</span>
            </a>
          )}
          {project.url?.repository && project.url.repository !== "" && (
            <a
              href={project.url.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link"
            >
              <span className="project-detail-link-label">Repository</span>
              <span>→</span>
            </a>
          )}
          {project.url?.documentation && project.url.documentation !== "" && (
            <a
              href={project.url.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link"
            >
              <span className="project-detail-link-label">Documentation</span>
              <span>→</span>
            </a>
          )}
        </div>
      </aside>

      <section className="project-detail-right">
        <div
          className={`project-detail-images ${styles["project-detail-images"]}`}
        >
          <img
            src={`${import.meta.env.BASE_URL}${project.image}`}
            alt={project.alt}
            onMouseMove={(e) => handleMouseMove(e, project.imageLabel)}
            onMouseLeave={handleMouseLeave}
          />
          {project.extraImages &&
            project.extraImages.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${project.title} ${index + 2}`}
                onMouseMove={(e) =>
                  handleMouseMove(e, project.extraImageLabels?.[index])
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
