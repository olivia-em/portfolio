import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectDetail.css";
import projectsData from "../data/projects.json";

const designShelf = projectsData.shelves.find(
  (shelf) => shelf.id === "designprojects",
);
const project = designShelf?.items?.find((item) => item.id === "collex");

export default function CollexPage() {
  const navigate = useNavigate();
  const [selectedMediaIndex, setSelectedMediaIndex] = React.useState(null);
  const [activeLightboxItems, setActiveLightboxItems] = React.useState([]);

  if (!project) return <div>Project not found</div>;

  const bookSection = project.sections?.find(
    (section) => section.id === "book",
  );
  const websiteSection = project.sections?.find(
    (section) => section.id === "website",
  );

  const buildImageItems = React.useCallback((section, labelPrefix) => {
    const firstImage = section?.image
      ? [
          {
            type: "image",
            src: section.image,
            fullSrc: section.image.replace("/grid/", "/"),
            alt: `${labelPrefix} image 1`,
          },
        ]
      : [];

    const extraImages = (section?.extraImages || []).map((img, idx) => ({
      type: "image",
      src: img,
      fullSrc: img.replace("/grid/", "/"),
      alt: `${labelPrefix} image ${idx + 2}`,
    }));

    return [...firstImage, ...extraImages];
  }, []);

  const buildVideoItems = React.useCallback((section, labelPrefix) => {
    return (section?.videos || []).map((video, idx) => ({
      type: "video",
      src: video,
      alt: `${labelPrefix} video ${idx + 1}`,
    }));
  }, []);

  // Book order: video first, then page images.
  const bookMediaItems = [
    ...buildVideoItems(bookSection, `${project.title} book`),
    ...buildImageItems(bookSection, `${project.title} book`),
  ];

  // Website order: lead image(s), then videos.
  const websiteMediaItems = [
    ...buildImageItems(websiteSection, `${project.title} website`),
    ...buildVideoItems(websiteSection, `${project.title} website`),
  ];

  // Keyboard navigation for lightbox and page
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedMediaIndex !== null) {
          setSelectedMediaIndex(null);
          setActiveLightboxItems([]);
        } else {
          navigate("/");
        }
      } else if (
        selectedMediaIndex !== null &&
        activeLightboxItems.length > 0
      ) {
        if (e.key === "ArrowLeft") {
          setSelectedMediaIndex((prev) =>
            prev === 0 ? activeLightboxItems.length - 1 : prev - 1,
          );
        } else if (e.key === "ArrowRight") {
          setSelectedMediaIndex((prev) =>
            prev === activeLightboxItems.length - 1 ? 0 : prev + 1,
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaIndex, navigate, activeLightboxItems]);

  const openLightbox = (items, index) => {
    const selectedItem = items[index];
    if (!selectedItem) return;

    setActiveLightboxItems(items);

    // Preload images before opening to avoid flashes.
    if (selectedItem.type === "image") {
      const img = new window.Image();
      img.onload = () => {
        setSelectedMediaIndex(index);
      };
      img.onerror = () => {
        alert("Failed to load image");
      };
      img.src = `${import.meta.env.BASE_URL}${selectedItem.fullSrc}`;
      return;
    }

    setSelectedMediaIndex(index);
  };

  // Lightbox close
  const closeLightbox = () => {
    setSelectedMediaIndex(null);
    setActiveLightboxItems([]);
  };

  const renderMediaGrid = (items, sectionId) => (
    <div className="collex-masonry-grid collex-section-masonry">
      {items.map((item, index) => (
        <button
          key={`${item.type}-${item.src}-${index}`}
          className="collex-masonry-item collex-grid-item collex-media-button"
          type="button"
          onClick={() => openLightbox(items, index)}
        >
          {item.type === "video" ? (
            <video
              src={`${import.meta.env.BASE_URL}${item.src}`}
              className={`collex-grid-media ${
                sectionId === "book" && index === 0
                  ? "collex-book-lead-video"
                  : ""
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={`${import.meta.env.BASE_URL}${item.src}`}
              alt={item.alt}
              loading="lazy"
              className="collex-grid-media"
            />
          )}
        </button>
      ))}
    </div>
  );

  const activeMediaItem =
    selectedMediaIndex !== null
      ? activeLightboxItems[selectedMediaIndex]
      : null;

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

      <section
        id={bookSection?.anchor || "project-collex"}
        className="collex-section"
      >
        <h2 className="collex-section-title">
          <a
            href={bookSection?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="collex-section-link"
          >
            a. Art Book
          </a>
        </h2>
        <div className="project-description">
          <p>{bookSection?.blurb || ""}</p>
        </div>
        {renderMediaGrid(bookMediaItems, "book")}
      </section>

      <section
        id={websiteSection?.anchor || "project-collex-website"}
        className="collex-section"
      >
        <h2 className="collex-section-title">
          <a
            href={websiteSection?.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="collex-section-link"
          >
            b. Website
          </a>
        </h2>
        <div className="project-description">
          <p>{websiteSection?.blurb || ""}</p>
        </div>
        {renderMediaGrid(websiteMediaItems, "website")}
      </section>

      <div className="project-links">
        {bookSection?.link && (
          <a
            href={bookSection.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span className="project-link-label">Book</span>
            <span>→</span>
          </a>
        )}
        {websiteSection?.link && (
          <a
            href={websiteSection.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <span className="project-link-label">Website</span>
            <span>→</span>
          </a>
        )}
      </div>

      {selectedMediaIndex !== null && activeMediaItem && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-backdrop"></div>
          <button
            className="collex-lightbox-close"
            type="button"
            aria-label="Close media"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            x
          </button>
          {activeLightboxItems.length > 1 && (
            <button
              className="lightbox-arrow lightbox-arrow-left"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMediaIndex((prev) =>
                  prev === 0 ? activeLightboxItems.length - 1 : prev - 1,
                );
              }}
            >
              ←
            </button>
          )}
          <div className="lightbox-carousel">
            <div
              className="lightbox-center-image"
              onClick={(e) => e.stopPropagation()}
            >
              {activeMediaItem.type === "video" ? (
                <video
                  src={`${import.meta.env.BASE_URL}${activeMediaItem.src}`}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="collex-lightbox-media"
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}${activeMediaItem.fullSrc}`}
                  alt={activeMediaItem.alt}
                  className="collex-lightbox-media"
                />
              )}
            </div>
          </div>
          {activeLightboxItems.length > 1 && (
            <button
              className="lightbox-arrow lightbox-arrow-right"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMediaIndex((prev) =>
                  prev === activeLightboxItems.length - 1 ? 0 : prev + 1,
                );
              }}
            >
              →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
