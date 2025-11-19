import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import projectsData from "../data/projects.json";
import "../styles/WebArtPage.css";

const WebArtPage = () => {
  const navigate = useNavigate();
  const webArtShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "webart"
  );

  if (!webArtShelf) {
    return <div>Category not found</div>;
  }

  const handleImageClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
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
    <div className="webart-page">
      <div className="webart-grid">
        {webArtShelf.items.map((item) => (
          <div
            key={item.id}
            className="webart-grid-item"
            onClick={() => handleImageClick(item.url)}
            style={{ cursor: item.url ? "pointer" : "default" }}
          >
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </div>

      <BackToHomeButton />
    </div>
  );
};

export default WebArtPage;
