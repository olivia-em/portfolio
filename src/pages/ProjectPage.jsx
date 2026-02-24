import "../styles/ProjectDetail.css";
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import projectsData from "../data/projects.json";

export default function ProjectPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  // Find the project data
  const shelf = projectsData.shelves.find((s) => s.id === category);
  const project = shelf?.items?.find((item) => item.id === slug);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const isGrid =
    category !== "staticdesign" &&
    category !== "webart" &&
    category !== "creativecoding";

  return (
    <div className="project-single-column">
      <h1 className="project-title">{project.title}</h1>
      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="project-description">
        <p>{project.description}</p>
      </div>
      {isGrid ? (
        <div
          className="project-media-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            width: "100%",
            margin: "2rem 0 2rem 0",
          }}
        >
          {project.image && (
            <img
              src={`${import.meta.env.BASE_URL}${project.image}`}
              alt={project.alt || project.title}
              className="project-main-image"
              style={{ width: "100%" }}
            />
          )}
          {project.extraImages &&
            project.extraImages.map((img, idx) => (
              <img
                key={idx}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${project.title} ${idx + 2}`}
                className="project-extra-image"
                style={{ width: "100%" }}
              />
            ))}
        </div>
      ) : (
        <div className="project-media-column">
          {project.image && (
            <img
              src={`${import.meta.env.BASE_URL}${project.image}`}
              alt={project.alt || project.title}
              className="project-main-image"
            />
          )}
          {project.extraImages &&
            project.extraImages.map((img, idx) => (
              <img
                key={idx}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${project.title} ${idx + 2}`}
                className="project-extra-image"
              />
            ))}
        </div>
      )}
    </div>
  );
}
