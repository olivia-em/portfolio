import React from "react";
import { useNavigate } from "react-router-dom";
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

const PRELOADER_MIN_DURATION_MS = 3000;

export default function CollagePage() {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [areImagesReady, setAreImagesReady] = React.useState(false);
  const [isMinTimeComplete, setIsMinTimeComplete] = React.useState(false);
  const [isFadingOut, setIsFadingOut] = React.useState(false);
  const [isPreloaderDone, setIsPreloaderDone] = React.useState(false);

  // Minimum preloader duration timer
  React.useEffect(() => {
    const minTimer = window.setTimeout(() => {
      setIsMinTimeComplete(true);
    }, PRELOADER_MIN_DURATION_MS);

    return () => {
      window.clearTimeout(minTimer);
    };
  }, []);

  // Fade out preloader when both conditions met
  React.useEffect(() => {
    if (areImagesReady && isMinTimeComplete && !isFadingOut) {
      setIsFadingOut(true);
    }
  }, [areImagesReady, isMinTimeComplete, isFadingOut]);

  // Fallback: ensure preloader completes even if transitionend does not fire
  React.useEffect(() => {
    if (!isFadingOut || isPreloaderDone) return;

    const fallbackTimer = window.setTimeout(() => {
      setIsPreloaderDone(true);
    }, 1200);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [isFadingOut, isPreloaderDone]);

  // Preload all collage images
  React.useEffect(() => {
    if (collageImages.length === 0) {
      setAreImagesReady(true);
      return;
    }

    let isCancelled = false;
    let loadedCount = 0;
    const baseUrl = import.meta.env.BASE_URL;

    const onImageFinished = () => {
      loadedCount += 1;
      if (!isCancelled && loadedCount === collageImages.length) {
        setAreImagesReady(true);
      }
    };

    const preloaders = collageImages.map((img) => {
      const preloader = new window.Image();
      preloader.onload = onImageFinished;
      preloader.onerror = onImageFinished;
      preloader.src = `${baseUrl}${img.thumb}`;
      return preloader;
    });

    return () => {
      isCancelled = true;
      preloaders.forEach((preloader) => {
        preloader.onload = null;
        preloader.onerror = null;
      });
    };
  }, []);

  const isPageLoading = !isPreloaderDone;

  React.useEffect(() => {
    if (isPageLoading) {
      document.body.classList.add("collage-preloading");
    } else {
      document.body.classList.remove("collage-preloading");
    }

    return () => {
      document.body.classList.remove("collage-preloading");
    };
  }, [isPageLoading]);

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

  if (isPageLoading) {
    return (
      <div
        className={`collage-preloader ${isFadingOut ? "fade-out" : ""}`}
        aria-label="Loading collage images"
        onTransitionEnd={() => {
          if (isFadingOut) {
            setIsPreloaderDone(true);
          }
        }}
      >
        <div className="collage-preloader-stars">
          <div id="s1" className="collage-preloader-star">
            ★
          </div>
          <div id="s2" className="collage-preloader-star">
            ★
          </div>
        </div>
      </div>
    );
  }

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
