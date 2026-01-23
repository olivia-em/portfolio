import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import styles from "../styles/InstallationPage.module.css";
import projectsData from "../data/projects.json";
import BackToHomeButton from "../components/BackToHomeButton";
import StarPreloader from "../components/StarPreloader";

const installationShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "installation",
);
const project = installationShelf?.items?.find(
  (item) => item.id === "saintbreak",
);

export default function SaintBreakPage() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = React.useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  // For preloader if needed in future
  // const imageCount =
  //   1 + (Array.isArray(project.extraImages) ? project.extraImages.length : 0);
  // const [loadedImages, setLoadedImages] = React.useState(
  //   Array(imageCount).fill(false)
  // );
  // const [fadeOut, setFadeOut] = React.useState(false);

  if (!project) return <div>Project not found</div>;

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

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // No preloader for now

  return (
    <div className="project-detail-root" style={{ position: "relative" }}>
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

        {/* No links for now, but keep structure for future */}
      </aside>

      <section
        className="project-detail-right"
        style={{ overflowY: "auto", maxHeight: "100vh" }}
      >
        <div
          className="saintbreak-media-column"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            padding: "1rem",
          }}
        >
          {/* First two slots: YouTube embeds */}
          {project.youtubeUrls && project.youtubeUrls.length > 0 && (
            <>
              {project.youtubeUrls.map((url, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    background: "#111",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={url
                      .replace("watch?v=", "embed/")
                      .replace("youtu.be/", "youtube.com/embed/")}
                    title={`Saint Break Video ${idx + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
                  ></iframe>
                </div>
              ))}
            </>
          )}
          {/* The rest: images */}
          <img
            src={`${import.meta.env.BASE_URL}${project.image}`}
            alt={project.alt}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          {project.extraImages &&
            project.extraImages.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${project.title} ${index + 2}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            ))}
        </div>
      </section>

      <BackToHomeButton />
    </div>
  );
}
