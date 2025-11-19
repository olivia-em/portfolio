import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ProjectPage() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  // ESC key navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <div className="project-page">
      <div className="project-inner">
        <Link to="/">← Back</Link>
        <h2>{slug.replace(/-/g, " ")}</h2>
        <p>
          This project page is intentionally blank for now. Content will be
          added later.
        </p>
      </div>
    </div>
  );
}
