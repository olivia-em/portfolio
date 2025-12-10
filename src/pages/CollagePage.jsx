import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import "../styles/CollagePage.css";

import projectsData from "../data/projects.json";

// Find the collage shelf and get its items
const collageShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "collage"
);
const collageImages = collageShelf
  ? collageShelf.items.map((item) => ({
      thumb: item.thumbnail,
      full: item.image,
      alt: item.alt || item.title || "Collage",
    }))
  : [];

export default function CollagePage() {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const openLightbox = (index) => {
    setIsLoading(true);

    // Preload the full-res image before showing lightbox
    const img = new Image();
    img.onload = () => {
      setSelectedImageIndex(index);
      setIsLoading(false);
    };
    img.onerror = (e) => {
      console.error("Failed to load full image:", collageImages[index].full);
      setIsLoading(false);
      alert("Failed to load image: " + collageImages[index].full);
    };
    img.src = `${import.meta.env.BASE_URL}${collageImages[index].full}`;
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? collageImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev === collageImages.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImageIndex !== null) {
          // Close lightbox if open
          closeLightbox();
        } else {
          // Go back to home if no lightbox
          navigate("/");
        }
      } else if (selectedImageIndex !== null) {
        // Arrow navigation only works when lightbox is open
        if (e.key === "ArrowLeft") {
          goToPrevious();
        } else if (e.key === "ArrowRight") {
          goToNext();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, navigate]);

  return (
    <div className="collage-page">
      <div className="collage-grid">
        {collageImages.map((img, index) => (
          <div
            key={img.thumb}
            className="collage-grid-item"
            onClick={() => openLightbox(index)}
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

          {/* <button className="lightbox-close" onClick={closeLightbox}>
            ×
          </button> */}

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
                src={`${import.meta.env.BASE_URL}${
                  collageImages[selectedImageIndex].full
                }`}
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

      <BackToHomeButton />
    </div>
  );
}
