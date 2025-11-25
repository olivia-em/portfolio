import React from "react";
import { useNavigate } from "react-router-dom";
import BackToHomeButton from "../components/BackToHomeButton";
import projectsData from "../data/projects.json";
import "../styles/VideoArtPage.css";

const VideoArtPage = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const videoArtShelf = projectsData.shelves.find(
    (shelf) => shelf.id === "videoart"
  );

  if (!videoArtShelf) {
    return <div>Category not found</div>;
  }

  const openLightbox = (item) => {
    setSelectedVideo(item);
  };

  const closeLightbox = () => {
    setSelectedVideo(null);
  };

  // Convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Extract video ID from various YouTube URL formats
    const videoIdMatch = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
    );
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }

    return url;
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedVideo) {
          // Close lightbox if open
          closeLightbox();
        } else {
          // Go back to home if no lightbox
          navigate("/");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, navigate]);

  return (
    <div className="videoart-page">
      <div className="videoart-grid">
        {videoArtShelf.items.map((item) => (
          <div
            key={item.id}
            className="videoart-grid-item"
            onClick={() => openLightbox(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
            />

            {/* Tags in top right corner */}
            {item.tags && item.tags.length > 0 && (
              <div className="videoart-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="videoart-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Hover blurb overlay */}
            {hoveredItem === item.id && item.blurb && (
              <div className="videoart-hover-blurb">
                <p>{item.blurb}</p>
              </div>
            )}

            <h3 className="videoart-title">{item.title}</h3>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-backdrop"></div>

          <div
            className="lightbox-video-container"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedVideo.youtubeUrl && (
              <iframe
                width="100%"
                height="100%"
                src={getEmbedUrl(selectedVideo.youtubeUrl)}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      )}

      {!selectedVideo && <BackToHomeButton />}
    </div>
  );
};

export default VideoArtPage;
