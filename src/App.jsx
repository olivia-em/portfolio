import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import WallCanvas from "./components/WallCanvas";
import ProjectPage from "./pages/ProjectPage";
import { HomeProvider } from "./contexts/HomeContext";
import MagazineHome from "./pages/MagazineHome";
import WebArtPage from "./pages/WebArtPage";
import DesignPage from "./pages/DesignPage";
import VideoArtPage from "./pages/VideoArtPage";
import LessonsInPerspective from "./pages/LessonsInPerspective";
import NewVoicesPage from "./pages/NewVoicesPage";
import CollagePage from "./pages/CollagePage";
import GirlTimePage from "./pages/GirlTimePage";
import SaintBreakPage from "./pages/SaintBreakPage";
import TinyDeskPage from "./pages/TinyDeskPage";
import CollexPage from "./pages/CollexPage";
import BackToHomeButton from "./components/BackToHomeButton";
import data from "./data/projects.json";

export const TagGlowContext = React.createContext([]);

// Build nav item -> tags map from projects.json
const navTags = (() => {
  const s = data.shelves;
  const find = (shelfId, itemId) =>
    s.find((sh) => sh.id === shelfId)?.items?.find((i) => i.id === itemId)
      ?.tags || [];
  return {
    "#project-collex": find("designprojects", "collex"),
    "#project-lessons": find("frontend", "lip"),
    "#project-saintbreak": find("installation", "saintbreak"),
    "#project-newvoices": find("frontend", "newvoices"),
    "#project-girltime": find("installation", "girltime"),
    "#project-tinydesk": find("installation", "tinydesk"),
    "#project-videoart": [],
    "#project-webart": [],
    "#project-design": [],
  };
})();

export default function App() {
  const [glowingTags, setGlowingTags] = React.useState([]);
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [showTOC, setShowTOC] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth <= 920,
  );
  const [pendingScrollTarget, setPendingScrollTarget] = React.useState(null);

  // Preloader now fires for ALL visitors on first load, not just mobile
  const [showInitialPreloader, setShowInitialPreloader] = React.useState(
    () => typeof window !== "undefined" && window.location.pathname === "/",
  );
  const [isInitialPreloaderFading, setIsInitialPreloaderFading] =
    React.useState(false);
  const [magazineReady, setMagazineReady] = React.useState(false);
  const mountTimeRef = React.useRef(Date.now());

  const allTags = React.useMemo(() => {
    const tagSet = new Set();
    data.shelves.forEach((shelf) => {
      if (shelf.tags) shelf.tags.forEach((t) => tagSet.add(t));
      if (Array.isArray(shelf.items)) {
        shelf.items.forEach((item) => {
          if (item.tags) item.tags.forEach((t) => tagSet.add(t));
        });
      }
    });
    return Array.from(tagSet).sort();
  }, []);

  const location = useLocation();

  React.useEffect(() => {
    console.debug(
      "[ROUTER] location changed:",
      location.pathname,
      location.key,
    );
  }, [location]);

  const navItems = [
    {
      href: "#project-collex",
      label: "Collected Exorcisms",
      subItems: [
        {
          href: "#project-collex",
          label: "a. Art Book",
          hoverId: "project-collex",
        },
        {
          href: "#project-collex-website",
          label: "b. Website",
          hoverId: "project-collex",
        },
      ],
    },
    { href: "#project-lessons", label: "Lessons in Perspective" },
    { href: "#project-saintbreak", label: "Saint Break" },
    { href: "#project-newvoices", label: "New Voices" },
    { href: "#project-girltime", label: "Girl Time" },
    { href: "#project-tinydesk", label: "Tiny Desk VJ" },
    { href: "#project-videoart", label: "Video Art" },
    { href: "#project-webart", label: "Creative Coding" },
    { href: "#project-design", label: "Static Design" },
  ];

  // --- Preloader: dismiss once MagazineHome signals all images loaded ---
  React.useEffect(() => {
    if (!showInitialPreloader || !magazineReady) return;

    const MIN_DELAY = 1000;
    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, MIN_DELAY - elapsed);

    const fadeTimer = setTimeout(() => {
      setIsInitialPreloaderFading(true);
    }, remaining);

    const doneTimer = setTimeout(() => {
      setShowInitialPreloader(false);
    }, remaining + 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [showInitialPreloader, magazineReady]);

  // Hard cap: dismiss preloader after 8s no matter what
  React.useEffect(() => {
    if (!showInitialPreloader) return;
    const cap = setTimeout(() => {
      setIsInitialPreloaderFading(true);
      setTimeout(() => setShowInitialPreloader(false), 1000);
    }, 8000);
    return () => clearTimeout(cap);
  }, [showInitialPreloader]);

  // --- Scroll: offsetTop walk + ResizeObserver re-snap after image load ---
  React.useEffect(() => {
    if (!pendingScrollTarget || showTOC) return;

    const container =
      document.querySelector(".app-right.mobile-show") ||
      document.querySelector(".app-right");
    if (!container) return;

    const getOffset = (targetId) => {
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return null;
      let offset = 0;
      let el = targetEl;
      while (el && el !== container) {
        offset += el.offsetTop;
        el = el.offsetParent;
      }
      return offset;
    };

    const offset = getOffset(pendingScrollTarget);
    if (offset !== null)
      container.scrollTo({ top: offset, behavior: "smooth" });

    const target = pendingScrollTarget;
    setPendingScrollTarget(null);

    let settleTimer = null;
    const observer = new ResizeObserver(() => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        const newOffset = getOffset(target);
        if (newOffset !== null) {
          container.scrollTo({ top: newOffset, behavior: "instant" });
        }
      }, 50);
    });

    observer.observe(container);

    const killTimer = setTimeout(() => {
      observer.disconnect();
      clearTimeout(settleTimer);
    }, 3000);

    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      clearTimeout(killTimer);
    };
  }, [pendingScrollTarget, showTOC]);

  return (
    <HomeProvider>
      <TagGlowContext.Provider value={glowingTags}>
        <div
          className="app-root"
          style={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
          {showInitialPreloader && (
            <div
              className={`collage-preloader ${isInitialPreloaderFading ? "fade-out" : ""}`}
              aria-label="Loading"
              style={{ zIndex: 3001 }}
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
          )}

          {/* Mobile toggle button */}
          <button
            className={`mobile-toggle-button ${showTOC ? "open" : ""}`}
            onClick={() => setShowTOC(!showTOC)}
            aria-label={showTOC ? "Show content" : "Show menu"}
          >
            <span className={`mobile-toggle-star ${showTOC ? "inverted" : ""}`}>
              ★
            </span>
          </button>

          <div className="magazine-root">
            <aside
              className={`magazine-left ${showTOC ? "mobile-show" : "mobile-hide"}`}
            >
              <h1 className="magazine-name">
                Olivia Lee
                <span className="cite-sup" aria-hidden>
                  1
                </span>
              </h1>
              <h2 className="magazine-name">
                <i>
                  <a
                    href="#about"
                    className="magazine-toc-link"
                    style={{ color: "inherit", textDecoration: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowTOC(false);
                      setPendingScrollTarget("about");
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.classList.add("hovered");
                      e.currentTarget.style.color = "#00c8ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.classList.remove("hovered");
                      e.currentTarget.style.color = "inherit";
                    }}
                  >
                    {(() => {
                      const text = "Multimedia Designer";
                      const dots = ".".repeat(Math.max(2, 32 - text.length));
                      return (
                        <>
                          Multimedia<sup style={{ color: "#00c8ff" }}>2</sup>
                          &nbsp;Designer
                          <sup style={{ color: "#00c8ff" }}>3</sup>
                          <span className="toc-dots">{dots}</span>0
                        </>
                      );
                    })()}
                  </a>
                </i>
              </h2>
              <nav className="magazine-toc">
                <ul>
                  <li>
                    <ul className="toc-dropdown">
                      {navItems.map((item, idx) => {
                        const text = item.label;
                        const dots = ".".repeat(Math.max(2, 30 - text.length));
                        const sectionId = item.href.startsWith("#")
                          ? item.href.slice(1)
                          : item.href;
                        return (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              className="toc-index-link"
                              onMouseEnter={() => {
                                console.log("Nav hover:", sectionId);
                                setHoveredItem(sectionId);
                              }}
                              onMouseLeave={() => setHoveredItem(null)}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowTOC(false);
                                const targetId = item.href.replace("#", "");
                                setPendingScrollTarget(targetId);
                              }}
                            >
                              {text}
                              <span className="toc-dots">{dots}</span>
                              {idx + 1}
                            </a>
                            {Array.isArray(item.subItems) &&
                              item.subItems.length > 0 && (
                                <ul className="toc-subitems">
                                  {item.subItems.map((subItem) => {
                                    const subTargetId = subItem.href.replace(
                                      "#",
                                      "",
                                    );
                                    return (
                                      <li key={subItem.href}>
                                        <a
                                          href={subItem.href}
                                          className="toc-subitem-link"
                                          onMouseEnter={() => {
                                            setHoveredItem(
                                              subItem.hoverId || sectionId,
                                            );
                                          }}
                                          onMouseLeave={() =>
                                            setHoveredItem(null)
                                          }
                                          onClick={(e) => {
                                            e.preventDefault();
                                            setShowTOC(false);
                                            setPendingScrollTarget(subTargetId);
                                          }}
                                        >
                                          {subItem.label}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            {(item.label === "Tiny Desk VJ" ||
                              item.label === "Static Design") && <br />}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                </ul>
              </nav>
              <ul className="magazine-citations">
                <li>
                  <span className="cite-num">1</span>
                  <a
                    href={`${import.meta.env.BASE_URL}Lee.Olivia_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <em>Resume</em>
                  </a>
                </li>
                <li>
                  <span className="cite-num">2</span>
                  <a
                    href="https://github.com/olivia-em"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <em>Github</em>
                  </a>
                </li>
                <li>
                  <span className="cite-num">3</span>
                  <a
                    href="https://www.instagram.com/oli.via.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <em>Instagram</em>
                  </a>
                </li>
              </ul>
              <div className="magazine-tag-cloud">
                {allTags.map((tag) => (
                  <span
                    key={tag}
                    className={
                      "project-tag-cloud" +
                      (glowingTags.includes(tag) ? " tag-glow" : "")
                    }
                    style={{ margin: "0 0.4em 0.4em 0", cursor: "pointer" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </div>
          <div
            className={`app-right ${showTOC ? "mobile-hide" : "mobile-show"}`}
            style={{
              flex: 1,
              height: "100vh",
              overflowY: "auto",
              position: "relative",
              zIndex: 20,
            }}
          >
            <MagazineHome
              setGlowingTags={setGlowingTags}
              hoveredItem={hoveredItem}
              setHoveredItem={setHoveredItem}
              onReady={() => setMagazineReady(true)}
            />
          </div>
        </div>
      </TagGlowContext.Provider>
    </HomeProvider>
  );
}

function MainRoutes() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  React.useEffect(() => {
    console.debug(
      "[ROUTER] location changed:",
      location.pathname,
      location.key,
    );
  }, [location]);

  return (
    <div
      className="app-right"
      style={{
        flex: 1,
        height: "100vh",
        overflowY: "auto",
        position: "relative",
        zIndex: 20,
      }}
    >
      <MagazineHome onlyCollage />
      {!isHome && (
        <div
          key={location.key}
          style={{
            height: "100%",
            background: "#fff",
            boxShadow: "0 0 24px 0 rgba(0,0,0,0.04)",
            zIndex: 30,
            mixBlendMode: "normal",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <Routes location={location} key={location.key}>
            <Route
              path="/canvas"
              element={<WallCanvas shelves={data.shelves} />}
            />
            <Route path="/works/webart" element={<WebArtPage />} />
            <Route path="/works/design" element={<DesignPage />} />
            <Route path="/works/videoart" element={<VideoArtPage />} />
            <Route path="/works/lessons" element={<LessonsInPerspective />} />
            <Route path="/works/newvoices" element={<NewVoicesPage />} />
            <Route path="/works/staticdesign" element={<CollagePage />} />
            <Route
              path="/works/installation/girltime"
              element={<GirlTimePage />}
            />
            <Route
              path="/works/installation/saintbreak"
              element={<SaintBreakPage />}
            />
            <Route
              path="/works/installation/tinydesk"
              element={<TinyDeskPage />}
            />
            <Route
              path="/works/designprojects/collex"
              element={<CollexPage />}
            />
            <Route path="/works/:category/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <BackToHomeButton />
        </div>
      )}
    </div>
  );
}
