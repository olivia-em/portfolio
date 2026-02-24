import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";
import ProjectLayout from "../components/ProjectLayout";

const installationShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "installation",
);
const project = installationShelf?.items?.find(
  (item) => item.id === "girltime",
);

export default function GirlTimePage() {
  const navigate = useNavigate();
  const [tooltip, setTooltip] = React.useState({
    show: false,
    text: "",
    x: 0,
    y: 0,
  });

  const imageCount =
    1 + (Array.isArray(project.extraImages) ? project.extraImages.length : 0);
  const [loadedImages, setLoadedImages] = React.useState(
    Array(imageCount).fill(false),
  );
  const [fadeOut, setFadeOut] = React.useState(false);

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

  // Preloader fade out when all images loaded
  React.useEffect(() => {
    if (loadedImages.every(Boolean)) {
      setTimeout(() => setFadeOut(true), 200); // short delay before fade
    }
  }, [loadedImages]);

  // Image onLoad handler
  const handleImageLoad = (idx) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  };

  return (
    <ProjectLayout project={project}>
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
    </ProjectLayout>
  );
}
