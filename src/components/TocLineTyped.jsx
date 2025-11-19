import React from "react";
import Typewriter from "./Typewriter";

// TocLineTyped: types the title, then reveals the dotted leader and page
// Props:
// - title: string
// - page: number|null
// - start, instant, speed, onComplete
export default function TocLineTyped({
  title = "",
  page = null,
  start = false,
  instant = false,
  speed,
  className = "",
  onComplete,
}) {
  const [showLeader, setShowLeader] = React.useState(false);

  const handleComplete = React.useCallback(() => {
    // reveal leader and page when title typing completes
    setShowLeader(true);
    // call caller's onComplete after a small delay so the reveal is visible
    setTimeout(() => onComplete && onComplete(), 80);
  }, [onComplete]);

  return (
    <span
      className={`toc-line ${className} ${showLeader ? "show-leader" : ""}`}
      style={{ display: "flex", alignItems: "baseline" }}
    >
      <span className="toc-title">
        <Typewriter
          text={title}
          start={start}
          instant={instant}
          speed={speed}
          onComplete={handleComplete}
        />
      </span>
      <span className="toc-leader" aria-hidden />
      {page != null && (
        <span className="toc-page" aria-hidden>
          {page}
        </span>
      )}
    </span>
  );
}
