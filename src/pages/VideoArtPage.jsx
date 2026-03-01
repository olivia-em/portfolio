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
    (shelf) => shelf.id === "videoart",
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
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/,
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
    <div
      className="videoart-page"
      style={{
        background: "#f8f6f3",
        color: "#222",
        minHeight: "100vh",
        overflowY: "auto",
        width: "100%",
      }}
    >
      <h1
        className="section-title"
        style={{ textAlign: "left", margin: "2rem 0rem 0rem 2rem" }}
      >
        Video Art
      </h1>
      <div className="videoart-column">
        {videoArtShelf.items.map((item) => (
          <div
            key={item.id}
            className="videoart-grid-item"
            style={{
              width: "100%",
              aspectRatio: "16/9",
              position: "relative",
              marginBottom: "1.2rem", // match Saint Break
              cursor: "pointer",
              background: "#111",
              borderRadius: 8, // match Saint Break
              overflow: "hidden",
            }}
            onClick={() => openLightbox(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={`${import.meta.env.BASE_URL}${item.image}`}
              alt={item.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: 8, // match Saint Break
                background: "#111",
              }}
            />
            {item.tags && item.tags.length > 0 && (
              <div className="videoart-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="videoart-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {item.blurb && (
              <div
                className="videoart-hover-blurb"
                style={{
                  opacity: hoveredItem === item.id ? 1 : 0,
                  pointerEvents: hoveredItem === item.id ? "auto" : "none",
                  transition: "opacity 0.2s",
                }}
              >
                <p>{item.blurb}</p>
              </div>
            )}
            <div
              className="videoart-title"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                color: "white",
                fontSize: 18,
                padding: 12,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                textAlign: "left",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {item.title}
            </div>
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

      {!selectedVideo}
    </div>
  );
};

export default VideoArtPage;
