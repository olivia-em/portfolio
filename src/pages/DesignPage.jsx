import React from "react";
import { useNavigate } from "react-router-dom";
import projectsData from "../data/projects.json";
import "../styles/CategoryPage.css";

const DesignPage = () => {
  const navigate = useNavigate();
  const designShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "design"
  );

  if (!designShelf) {
    return <div>Category not found</div>;
  }

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
    <div className="category-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1 className="category-title">{designShelf.title}</h1>

      <div className="category-grid">
        {designShelf.items.map((item) => (
          <div key={item.id} className="category-item">
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
              className="category-image"
            />
            <h3 className="item-title">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignPage;
