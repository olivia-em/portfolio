import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/ProjectDetail.css";
import styles from "../styles/InstallationPage.module.css";
import projectsData from "../data/projects.json";
import BackToHomeButton from "../components/BackToHomeButton";
import StarPreloader from "../components/StarPreloader";

const designShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "designprojects",
);
const project = designShelf?.items?.find((item) => item.id === "collex");

export default function CollexPage() {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  if (!project) return <div>Project not found</div>;

  // Use grid images for grid, reconstruct high-res paths for lightbox
  const gridImages = [
    {
      src: project.image,
      alt: project.alt || project.title,
    },
    ...(project.extraImages || []).map((img, idx) => ({
      src: img,
      alt: `${project.title} ${idx + 2}`,
    })),
  ];
  // Reconstruct high-res paths for lightbox
  const lightboxImages = [
    {
      src: project.image.replace("/grid/", "/"),
      alt: project.alt || project.title,
    },
    ...(project.extraImages || []).map((img, idx) => ({
      src: img.replace("/grid/", "/"),
      alt: `${project.title} ${idx + 2}`,
    })),
  ];

  // Keyboard navigation for lightbox and page
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImageIndex !== null) {
          setSelectedImageIndex(null);
        } else {
          navigate("/");
        }
      } else if (selectedImageIndex !== null) {
        if (e.key === "ArrowLeft") {
          setSelectedImageIndex((prev) =>
            prev === 0 ? lightboxImages.length - 1 : prev - 1,
          );
        } else if (e.key === "ArrowRight") {
          setSelectedImageIndex((prev) =>
            prev === lightboxImages.length - 1 ? 0 : prev + 1,
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, navigate, lightboxImages.length]);

  // Lightbox open
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
    img.src = `${import.meta.env.BASE_URL}${lightboxImages[index].src}`;
  };

  // Lightbox close
  const closeLightbox = () => setSelectedImageIndex(null);

  return (
    <div className="project-single-column">
      <h1 className="project-title">{project.title}</h1>
      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="project-description">
        <p>{project.description}</p>
      </div>
      <div
        className="collex-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          padding: "1rem",
        }}
      >
        {gridImages.map((img, index) => (
          <div
            key={img.src}
            className="collex-grid-item"
            onClick={() => openLightbox(index)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${img.src}`}
              alt={img.alt}
              loading="lazy"
              style={{
                width: "100%",
                borderRadius: "8px",
                transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
              }}
              className="collex-grid-img"
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
              setSelectedImageIndex((prev) =>
                prev === 0 ? lightboxImages.length - 1 : prev - 1,
              );
            }}
          >
            ←
          </button>
          <div className="lightbox-carousel">
            <div className="lightbox-center-image">
              <img
                src={`${import.meta.env.BASE_URL}${lightboxImages[selectedImageIndex].src}`}
                alt={lightboxImages[selectedImageIndex].alt}
                style={{ maxHeight: "80vh", maxWidth: "90vw" }}
              />
            </div>
          </div>
          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev === lightboxImages.length - 1 ? 0 : prev + 1,
              );
            }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
