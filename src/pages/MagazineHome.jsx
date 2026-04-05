import React from "react";
import { Link } from "react-router-dom";
import "../styles/magazine.css";
import TocLine from "../components/TocLine";
import { useHome } from "../contexts/HomeContext";
import projectsData from "../data/projects.json";

import CollexPage from "./CollexPage";
import LessonsInPerspective from "./LessonsInPerspective";
import SaintBreakPage from "./SaintBreakPage";
import NewVoicesPage from "./NewVoicesPage";
import GirlTimePage from "./GirlTimePage";
import TinyDeskPage from "./TinyDeskPage";
import VideoArtPage from "./VideoArtPage";
import WebArtPage from "./WebArtPage";
import CollagePage from "./CollagePage";
import AboutPage from "./AboutPage";
import HomeCollage from "../components/HomeCollage";
import BackToHomeButton from "../components/BackToHomeButton";

const getScrollContainer = () => document.querySelector(".app-right");

// Map section IDs to their tags from projects.json
const buildSectionTags = () => {
  const s = projectsData.shelves;
  const find = (shelfId, itemId) =>
    s.find((sh) => sh.id === shelfId)?.items?.find((i) => i.id === itemId)
      ?.tags || [];
  return {
    home: [],
    "project-collex": find("designprojects", "collex"),
    "project-collex-website": find("designprojects", "collex"),
    "project-lessons": find("frontend", "lip"),
    "project-saintbreak": find("installation", "saintbreak"),
    "project-newvoices": find("frontend", "newvoices"),
    "project-girltime": find("installation", "girltime"),
    "project-tinydesk": find("installation", "tinydesk"),
    "project-videoart": [],
    "project-webart": [],
    "project-design": [],
    about: [],
  };
};

const sectionTags = buildSectionTags();

export default function MagazineHome({
  onlyCollage = false,
  setGlowingTags = () => {},
  hoveredItem,
  setHoveredItem,
  onActiveSectionChange = () => {},
  onReady = () => {},
}) {
  const sectionIds = [
    "home",
    "project-collex",
    "project-collex-website",
    "project-lessons",
    "project-saintbreak",
    "project-newvoices",
    "project-girltime",
    "project-tinydesk",
    "project-videoart",
    "project-webart",
    "project-design",
    "about",
  ];

  React.useEffect(() => {
    // Force all images to load eagerly so they don't defer
    const imgs = Array.from(document.querySelectorAll(".magazine-scroll img"));
    imgs.forEach((img) => {
      img.loading = "eager";
    });
  }, []);

  React.useEffect(() => {
    let observer;

    const tryAttach = () => {
      const imgs = Array.from(
        document.querySelectorAll(".magazine-scroll img"),
      );
      console.log("[READY] tryAttach found imgs:", imgs.length);

      if (imgs.length === 0) {
        observer = new MutationObserver(() => {
          const newImgs = Array.from(
            document.querySelectorAll(".magazine-scroll img"),
          );
          if (newImgs.length > 0) {
            console.log("[READY] MutationObserver found imgs:", newImgs.length);
            observer.disconnect();
            attachListeners(newImgs);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        return;
      }

      attachListeners(imgs);
    };

    const attachListeners = (imgs) => {
      let remaining = imgs.filter(
        (img) => !img.complete || img.naturalWidth === 0,
      ).length;

      console.log("[READY] total imgs:", imgs.length, "pending:", remaining);

      if (remaining === 0) {
        console.log("[READY] all cached, calling onReady immediately");
        onReady();
        return;
      }

      const onSettle = () => {
        remaining -= 1;
        console.log("[READY] image settled, remaining:", remaining);
        if (remaining === 0) {
          console.log("[READY] all done, calling onReady");
          onReady();
        }
      };

      imgs.forEach((img) => {
        if (!img.complete || img.naturalWidth === 0) {
          img.addEventListener("load", onSettle, { once: true });
          img.addEventListener("error", onSettle, { once: true });
        }
      });
    };

    tryAttach();
    return () => observer?.disconnect();
  }, []);
  // URL hash tracking + tag glowing via scroll
  React.useEffect(() => {
    const container = getScrollContainer();
    if (!container) {
      console.log("[MAGAZINE] No scroll container found");
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    console.log(
      "[MAGAZINE] Sections found:",
      sections.map((s) => s.id),
    );
    if (sections.length === 0) return;

    const handleScroll = (() => {
      let ticking = false;
      return () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          if (container.scrollTop < 50) {
            window.history.replaceState(null, "", window.location.pathname);
            setGlowingTags([]);
            onActiveSectionChange("home");
            ticking = false;
            return;
          }

          let closestSection = null;
          let minDistance = Infinity;
          const containerTop = container.getBoundingClientRect().top;

          sections.forEach((el) => {
            const distance = Math.abs(
              el.getBoundingClientRect().top - containerTop,
            );
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = el.id;
            }
          });

          if (closestSection) {
            window.history.replaceState(null, "", "#" + closestSection);
            setGlowingTags(sectionTags[closestSection] || []);
            onActiveSectionChange(closestSection);
          }
          ticking = false;
        });
      };
    })();

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [setGlowingTags, onActiveSectionChange]);

  // Scroll to section
  const scrollToSection = (id) => {
    const container = getScrollContainer();
    const el = document.getElementById(id);
    if (container && el) {
      const containerTop = container.getBoundingClientRect().top;
      const top =
        el.getBoundingClientRect().top - containerTop + container.scrollTop;
      container.scrollTo({ top, behavior: "smooth" });
      window.history.replaceState(null, "", "#" + id);
    }
  };

  // Back to home
  const handleBackToHome = () => {
    const container = getScrollContainer();
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
        setGlowingTags([]);
      }, 400);
    }
  };

  const onImageLoad = React.useCallback(() => {
    setLoadedCount((c) => c + 1);
  }, []);

  const { homeReady, setHomeReady, typedOnce, setTypedOnce } = useHome();
  const [step, setStep] = React.useState(0);
  const [showCollage, setShowCollage] = React.useState(true);
  const [loadedCount, setLoadedCount] = React.useState(0);
  const [introActive, setIntroActive] = React.useState(false);
  const [revealed, setRevealed] = React.useState(true);
  // If hoveredItem is passed as a prop, use it; otherwise, manage local state
  const [localHoveredItem, setLocalHoveredItem] = React.useState(null);
  const effectiveHoveredItem =
    hoveredItem !== undefined ? hoveredItem : localHoveredItem;
  const [activeSection, setActiveSection] = React.useState(null);

  // Map sectionId to shelfId/itemId for preview lookup
  const sectionPreviewMap = {
    "project-collex": { shelfId: "designprojects", itemId: "collex" },
    "project-lessons": { shelfId: "frontend", itemId: "lip" },
    "project-saintbreak": { shelfId: "installation", itemId: "saintbreak" },
    "project-newvoices": { shelfId: "frontend", itemId: "newvoices" },
    "project-girltime": { shelfId: "installation", itemId: "girltime" },
    "project-tinydesk": { shelfId: "installation", itemId: "tinydesk" },
    "project-videoart": { shelfId: "videoart" },
    "project-webart": { shelfId: "webart" },
    "project-design": { shelfId: "staticdesign" },
  };

  // Preview logic: get preview image/blurb/tags for hovered item
  function getPreviewData(sectionId) {
    if (!sectionId) return null;
    const map = sectionPreviewMap[sectionId];
    if (!map) {
      console.log("[getPreviewData] no mapping for", sectionId);
      return null;
    }
    // If both shelfId and itemId, show item preview
    if (map.shelfId && map.itemId) {
      const shelf = projectsData.shelves.find((s) => s.id === map.shelfId);
      const item = shelf?.items?.find((i) => i.id === map.itemId);
      if (item && (item.heroImage || item.image)) {
        const images = [item.heroImage || item.image];
        if (item.extraImages && item.extraImages.length > 0) {
          images.push(...item.extraImages.slice(0, 2));
        }
        const result = {
          images: images.slice(0, 3),
          blurb: item.blurb,
          tags: item.tags || [],
        };
        console.log("[getPreviewData] mapped item", sectionId, result);
        return result;
      }
    }
    // If only shelfId, show shelf preview
    if (map.shelfId && !map.itemId) {
      const shelf = projectsData.shelves.find((s) => s.id === map.shelfId);
      if (shelf) {
        let images = [];
        if (Array.isArray(shelf.heroImages) && shelf.heroImages.length > 0) {
          images = [...shelf.heroImages];
        } else if (shelf.heroImage) {
          images.push(shelf.heroImage);
        }
        if (shelf.items && shelf.items.length > 0) {
          const itemsToAdd = 3 - images.length;
          if (itemsToAdd > 0) {
            shelf.items.slice(0, itemsToAdd).forEach((item) => {
              const imgSrc = item.thumbnail || item.image;
              if (imgSrc) images.push(imgSrc);
            });
          }
        }
        if (images.length > 0) {
          const result = {
            images: images.slice(0, 3),
            blurb: shelf.blurb,
            tags: shelf.tags || [],
          };
          console.log("[getPreviewData] mapped shelf", sectionId, result);
          return result;
        }
      }
    }
    console.log("[getPreviewData] no preview for", sectionId);
    return null;
  }

  const previewData = effectiveHoveredItem
    ? getPreviewData(effectiveHoveredItem)
    : null;

  return (
    <div className="magazine-scroll">
      <div id="home">
        <HomeCollage
          showCollage={showCollage}
          onImageLoad={onImageLoad}
          previewData={previewData}
          introActive={introActive}
          revealed={revealed}
          onBackToHome={handleBackToHome}
        />
      </div>
      <section id="project-collex" className="magazine-section">
        <CollexPage />
      </section>
      <section id="project-lessons" className="magazine-section">
        <LessonsInPerspective />
      </section>
      <section id="project-saintbreak" className="magazine-section">
        <SaintBreakPage />
      </section>
      <section id="project-newvoices" className="magazine-section">
        <NewVoicesPage />
      </section>
      <section id="project-girltime" className="magazine-section">
        <GirlTimePage />
      </section>
      <section id="project-tinydesk" className="magazine-section">
        <TinyDeskPage />
      </section>
      <section id="project-videoart" className="magazine-section">
        <VideoArtPage />
      </section>
      <section id="project-webart" className="magazine-section">
        <WebArtPage />
      </section>
      <section id="project-design" className="magazine-section">
        <CollagePage />
      </section>
      <section id="about" className="magazine-section">
        <AboutPage />
      </section>
      <BackToHomeButton onClick={handleBackToHome} />
    </div>
  );
}
