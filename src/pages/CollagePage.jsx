import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import "../styles/CollagePage.css";
import "../styles/WebArtPage.css";

import projectsData from "../data/projects.json";

// Find the static design shelf and get its items
const collageShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "staticdesign",
);
const collageImages = collageShelf
  ? collageShelf.items.map((item) => ({
      thumb: item.thumbnail,
      full: item.image,
      alt: item.alt || item.title || "Static Design",
    }))
  : [];

export default function CollagePage() {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const openLightbox = (index) => {
    setIsLoading(true);
    const img = new window.Image();
    img.onload = () => {
      setSelectedImageIndex(index);
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
      alert("Failed to load image");
    };
    img.src = `${import.meta.env.BASE_URL}${collageImages[index].full}`;
  };

  const closeLightbox = () => setSelectedImageIndex(null);
  const goToPrevious = () =>
    setSelectedImageIndex((prev) =>
      prev === 0 ? collageImages.length - 1 : prev - 1,
    );
  const goToNext = () =>
    setSelectedImageIndex((prev) =>
      prev === collageImages.length - 1 ? 0 : prev + 1,
    );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImageIndex !== null) {
          closeLightbox();
        } else {
          navigate("/");
        }
      } else if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") goToPrevious();
        else if (e.key === "ArrowRight") goToNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, navigate]);

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
        Static Design
      </h1>
      {!collageShelf && (
        <div style={{ color: "red", padding: 24 }}>
          <strong>
            Could not find the "staticdesign" shelf in projects.json.
          </strong>
        </div>
      )}
      {collageShelf && collageImages.length === 0 && (
        <div style={{ color: "orange", padding: 24 }}>
          <strong>No images found in the "staticdesign" shelf.</strong>
        </div>
      )}
      <div className="webart-grid">
        {collageImages.map((img, index) => (
          <div
            key={img.thumb}
            className="webart-grid-item"
            onClick={() => openLightbox(index)}
            style={{ cursor: "pointer" }}
            tabIndex={0}
          >
            <img
              src={`${import.meta.env.BASE_URL}${img.thumb}`}
              alt={`Collage ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedImageIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-backdrop"></div>
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            ←
          </button>
          <div className="lightbox-carousel">
            <div className="lightbox-center-image">
              <img
                src={`${import.meta.env.BASE_URL}${collageImages[selectedImageIndex].full}`}
                alt={`Collage ${selectedImageIndex + 1}`}
              />
            </div>
          </div>
          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
