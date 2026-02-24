import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";
import ProjectLayout from "../components/ProjectLayout";

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
    (shelf) => shelf.id === "frontend",
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
    <ProjectLayout project={lipData}>
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
