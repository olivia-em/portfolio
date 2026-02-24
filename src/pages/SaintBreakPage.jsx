import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";
import ProjectLayout from "../components/ProjectLayout";

export default function SaintBreakPage() {
  const installationShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "installation",
  );
  const project = installationShelf?.items?.find(
    (item) => item.id === "saintbreak",
  );

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

  return <ProjectLayout project={project} />;
}
