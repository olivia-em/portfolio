import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import "../styles/CollagePage.css";

const collageImages = [
  {
    thumb: "/images/design/collage/thumbnails/IMG_0908.jpg",
    full: "/images/design/collage/IMG_0908.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1825.jpg",
    full: "/images/design/collage/IMG_1825.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1827.jpg",
    full: "/images/design/collage/IMG_1827.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1828.jpg",
    full: "/images/design/collage/IMG_1828.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1829.jpg",
    full: "/images/design/collage/IMG_1829.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1830.jpg",
    full: "/images/design/collage/IMG_1830.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1831.jpg",
    full: "/images/design/collage/IMG_1831.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1832.jpg",
    full: "/images/design/collage/IMG_1832.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1833.jpg",
    full: "/images/design/collage/IMG_1833.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1836.jpg",
    full: "/images/design/collage/IMG_1836.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1837.jpg",
    full: "/images/design/collage/IMG_1837.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1838.jpg",
    full: "/images/design/collage/IMG_1838.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1839.jpg",
    full: "/images/design/collage/IMG_1839.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1840.jpg",
    full: "/images/design/collage/IMG_1840.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1841.jpg",
    full: "/images/design/collage/IMG_1841.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1842.jpg",
    full: "/images/design/collage/IMG_1842.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_1843.jpg",
    full: "/images/design/collage/IMG_1843.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/IMG_9332.jpg",
    full: "/images/design/collage/IMG_9332.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/aboutOlivia.jpg",
    full: "/images/design/collage/aboutOlivia.png",
  },
  {
    thumb: "/images/design/collage/thumbnails/bodiesbodies.jpg",
    full: "/images/design/collage/bodiesbodies.png",
  },
  {
    thumb: "/images/design/collage/thumbnails/elevate.jpg",
    full: "/images/design/collage/elevate.png",
  },
  {
    thumb: "/images/design/collage/thumbnails/perspective.jpg",
    full: "/images/design/collage/perspective.JPG",
  },
  {
    thumb: "/images/design/collage/thumbnails/untitled.jpg",
    full: "/images/design/collage/untitled.jpg",
  },
  {
    thumb: "/images/design/collage/thumbnails/voyeur.jpg",
    full: "/images/design/collage/voyeur.png",
  },
];

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
    img.src = collageImages[index].full;
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
            <img src={img.thumb} alt={`Collage ${index + 1}`} loading="lazy" />
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
                src={collageImages[selectedImageIndex].full}
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
