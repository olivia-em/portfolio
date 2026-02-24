import React, { useState, useCallback, useEffect } from "react";

/**
 * ProjectLayout - a reusable layout for project pages.
 * Pass in a `project` object with {title, tags, description, image, extraImages, ...}
 * Optionally pass children for custom content below the grid.
 */
export default function ProjectLayout({ project, children, renderImage }) {
  if (!project) return <div>Project not found</div>;

  // Build grid images array
  const gridImages = [
    project.image && {
      src: project.image,
      alt: project.alt || project.title,
    },
    ...(project.extraImages || []).map((img, idx) => ({
      src: img,
      alt: `${project.title} ${idx + 2}`,
    })),
  ].filter(Boolean);

  // For lightbox, use high-res if grid path contains /grid/
  const lightboxImages = gridImages.map((img) => ({
    src: img.src.replace("/grid/", "/"),
    alt: img.alt,
  }));

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && selectedImageIndex !== null) {
        setSelectedImageIndex(null);
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
  }, [selectedImageIndex, lightboxImages.length]);

  const openLightbox = useCallback(
    (index) => {
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
    },
    [lightboxImages],
  );

  const closeLightbox = useCallback(() => setSelectedImageIndex(null), []);

  return (
    <div className="project-single-column">
      <h1 className="project-title">{project.title}</h1>
      {project.tags && project.tags.length > 0 && (
        <div className="project-tags">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="project-description">
        <p>{project.description}</p>
      </div>
      {(project.url?.website || project.url?.repository) && (
        <div className="project-links">
          {project.url?.website && (
            <a
              href={project.url.website}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <span className="project-link-label">Website</span>
              <span>→</span>
            </a>
          )}
          {project.url?.repository && (
            <a
              href={project.url.repository}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <span className="project-link-label">Repository</span>
              <span>→</span>
            </a>
          )}
        </div>
      )}
      {/* Render YouTube videos for Saint Break only, after description/links, before images */}
      {project.id === "saintbreak" &&
        project.youtubeUrls &&
        project.youtubeUrls.length > 0 && (
          <div
            className="project-media-column"
            style={{ width: "100%", margin: "2rem 0" }}
          >
            {project.youtubeUrls.map((url, idx) => (
              <div
                key={idx}
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#111",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "1.2rem",
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
          </div>
        )}
      <div className="collex-masonry-grid">
        {gridImages.map((img, idx) => {
          const onClick = () => openLightbox(idx);
          if (renderImage) {
            return renderImage({ img: { ...img, onClick }, idx });
          }
          return (
            <div
              key={img.src}
              className="collex-masonry-item"
              onClick={onClick}
              style={{
                breakInside: "avoid",
                cursor: "pointer",
                marginBottom: "1.5rem",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${img.src}`}
                alt={img.alt}
                loading="lazy"
                className="collex-masonry-img"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              />
            </div>
          );
        })}
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
      {children}
    </div>
  );
}
