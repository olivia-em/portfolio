import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import projectsData from "../data/projects.json";
import "../styles/WebArtPage.css";

const WebArtPage = () => {
  const navigate = useNavigate();
  const webArtShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "webart",
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
    <div
      className="webart-page"
      style={{
        background: "#f8f6f3",
        color: "#222",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <h1
        className="section-title"
        style={{ textAlign: "left", margin: "2rem 0 1.5rem 0" }}
      >
        Creative Coding
      </h1>
      <div className="webart-grid">
        {webArtShelf.items.map((item) => (
          <div
            key={item.id}
            className="webart-grid-item"
            onClick={() => handleImageClick(item.url)}
            style={{ cursor: item.url ? "pointer" : "default" }}
            tabIndex={0}
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
            />
            {item.tags && item.tags.length > 0 && (
              <div className="webart-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="webart-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.blurb && (
              <div className="webart-hover-blurb">{item.blurb}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebArtPage;
