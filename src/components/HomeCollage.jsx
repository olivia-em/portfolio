import React from "react";
import "../styles/magazine.css";

const images = ["images/design/design/aboutOlivia.jpg"];

export default function HomeCollage({
  showCollage = true,
  onImageLoad,
  previewData,
  introActive,
  revealed,
  onBackToHome,
}) {
  const isSingleBackground = images.length === 1;

  // Scroll-to-top handler for star button
  const handleBackToHome = () => {
    if (typeof onBackToHome === "function") {
      onBackToHome();
    } else {
      // fallback: scroll to top
      document
        .getElementById("collage")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };
  React.useEffect(() => {
    if (previewData) {
      console.log("[HomeCollage] previewData received:", previewData);
    }
  }, [previewData]);
  return (
    <section id="collage" className="magazine-section">
      <div className="collage-wrap">
        <div
          className={`collage ${previewData ? "blurred" : ""} ${isSingleBackground ? "single-bg" : ""}`}
          aria-hidden={!showCollage}
        >
          {showCollage &&
            images.map((src, i) => (
              <img
                key={src}
                src={`${import.meta.env.BASE_URL}${src}`}
                className={`c-img c-img-${i + 1}`}
                alt={
                  isSingleBackground
                    ? "About Olivia background"
                    : `Olivia collage ${i + 1}`
                }
                loading="lazy"
                onLoad={onImageLoad}
              />
            ))}
        </div>
        {introActive && (
          <div className={`collage-cover ${revealed ? "reveal" : ""}`} />
        )}
        {/* Preview overlay on hover */}
        {previewData && (
          <div className="collage-preview-overlay">
            {previewData.images && previewData.images.length > 0 && (
              <img
                key={previewData.images[0]}
                src={
                  previewData.images[0].startsWith("/")
                    ? `${import.meta.env.BASE_URL}${previewData.images[0]}`
                    : previewData.images[0]
                }
                alt={previewData.blurb || "Preview"}
                className="collage-preview-img collage-preview-img-full"
              />
            )}
            <div className="collage-preview-info">
              {previewData.blurb && (
                <div className="collage-preview-blurb">
                  <p>{previewData.blurb}</p>
                </div>
              )}
              {previewData.tags && previewData.tags.length > 0 && (
                <div className="preview-tags">
                  {previewData.tags.map((tag, idx) => (
                    <span className="preview-tag" key={tag + idx}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Star button for scroll-to-top */}
      </div>
    </section>
  );
}
