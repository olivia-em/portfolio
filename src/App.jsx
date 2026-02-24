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
    { href: "#project-collex", label: "Collected Exorcisms" },
    { href: "#project-lessons", label: "Lessons in Perspective" },
    { href: "#project-saintbreak", label: "Saint Break" },
    { href: "#project-newvoices", label: "New Voices" },
    { href: "#project-girltime", label: "Girl Time" },
    { href: "#project-tinydesk", label: "Tiny Desk VJ" },
    { href: "#project-videoart", label: "Video Art" },
    { href: "#project-webart", label: "Creative Coding" },
    { href: "#project-design", label: "Static Design" },
  ];

  return (
    <HomeProvider>
      <TagGlowContext.Provider value={glowingTags}>
        <div
          className="app-root"
          style={{ display: "flex", height: "100vh", overflow: "hidden" }}
        >
          <div className="magazine-root">
            <aside className="magazine-left">
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
                      {navItems.map((item, idx, arr) => {
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
                            >
                              {text}
                              <span className="toc-dots">{dots}</span>
                              {idx + 1}
                            </a>
                            {/* Add line break after Tiny Desk VJ and after Static Design */}
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
                    href="/portfolio/images/aboutolivia/Lee.Olivia_Resume_Dev.pdf"
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
            className="app-right"
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

// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// // import Styles from "./styles/magazine.css";

// import WallCanvas from "./components/WallCanvas";
// import ProjectPage from "./pages/ProjectPage";
// import { HomeProvider } from "./contexts/HomeContext";
// import MagazineHome from "./pages/MagazineHome";
// import WebArtPage from "./pages/WebArtPage";
// import DesignPage from "./pages/DesignPage";
// import VideoArtPage from "./pages/VideoArtPage";
// import LessonsInPerspective from "./pages/LessonsInPerspective";
// import NewVoicesPage from "./pages/NewVoicesPage";
// import CollagePage from "./pages/CollagePage";
// import GirlTimePage from "./pages/GirlTimePage";
// import SaintBreakPage from "./pages/SaintBreakPage";
// import TinyDeskPage from "./pages/TinyDeskPage";
// import CollexPage from "./pages/CollexPage";
// import BackToHomeButton from "./components/BackToHomeButton";
// import data from "./data/projects.json";

// // Context for glowing tags
// export const TagGlowContext = React.createContext([]);

// export default function App() {
//   // State for glowing tags
//   const [glowingTags, setGlowingTags] = React.useState([]);

//   // --- Tag Cloud Logic ---
//   // Collect all unique tags from all projects
//   const allTags = React.useMemo(() => {
//     const tagSet = new Set();
//     data.shelves.forEach((shelf) => {
//       if (shelf.tags) shelf.tags.forEach((t) => tagSet.add(t));
//       if (Array.isArray(shelf.items)) {
//         shelf.items.forEach((item) => {
//           if (item.tags) item.tags.forEach((t) => tagSet.add(t));
//         });
//       }
//     });
//     return Array.from(tagSet).sort();
//   }, []);

//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   React.useEffect(() => {
//     // Debug location changes
//     // eslint-disable-next-line no-console
//     console.debug(
//       "[ROUTER] location changed:",
//       location.pathname,
//       location.key,
//     );
//   }, [location]);

//   return (
//     <HomeProvider>
//       <TagGlowContext.Provider value={glowingTags}>
//         <div
//           className="app-root"
//           style={{ display: "flex", height: "100vh", overflow: "hidden" }}
//         >
//           {/* Left column: Fixed nav bar */}
//           <div className="magazine-root">
//             <aside className="magazine-left">
//               <h1 className="magazine-name">
//                 Olivia Lee
//                 <span className="cite-sup" aria-hidden>
//                   1
//                 </span>
//               </h1>
//               <h2 className="magazine-name">
//                 <a
//                   href="#about"
//                   className="magazine-toc-link"
//                   style={{
//                     color: "inherit",
//                     textDecoration: "none",
//                     transition: "color 0.18s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.color = "#00c8ff")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.color = "inherit")
//                   }
//                 >
//                   <i>
//                     {(() => {
//                       const text = "Multimedia Designer";
//                       const dots = ".".repeat(Math.max(2, 33 - text.length));
//                       return (
//                         <>
//                           {text}
//                           <span className="toc-dots">{dots}</span>0
//                         </>
//                       );
//                     })()}
//                   </i>
//                 </a>
//               </h2>
//               <nav className="magazine-toc">
//                 <ul>
//                   <li>
//                     <ul className="toc-dropdown">
//                       {[
//                         {
//                           href: "#project-collex",
//                           label: "Collected Exorcisms",
//                         },
//                         {
//                           href: "#project-lessons",
//                           label: "Lessons in Perspective",
//                         },
//                         { href: "#project-saintbreak", label: "Saint Break" },
//                         { href: "#project-newvoices", label: "New Voices" },
//                         { href: "#project-girltime", label: "Girl Time" },
//                         { href: "#project-tinydesk", label: "Tiny Desk VJ" },
//                         { href: "#project-videoart", label: "Video Art" },
//                         { href: "#project-webart", label: "Creative Coding" },
//                         { href: "#project-design", label: "Static Design" },
//                       ].map((item, idx, arr) => {
//                         const text = item.label;
//                         const dots = ".".repeat(Math.max(2, 30 - text.length));
//                         return (
//                           <li key={item.href}>
//                             <a href={item.href} className="toc-index-link">
//                               {text}
//                               <span className="toc-dots">{dots}</span>
//                               {idx + 1}
//                             </a>
//                             {/* Add line break after Tiny Desk VJ and after Static Design */}
//                             {(item.label === "Tiny Desk VJ" ||
//                               item.label === "Static Design") && <br />}
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </li>
//                 </ul>
//               </nav>
//               <ul className="magazine-citations">
//                 <li>
//                   <span className="cite-num">1</span>
//                   <a
//                     href="/portfolio/images/aboutolivia/Lee.Olivia_Resume_Dev.pdf"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <em>Resume</em>
//                   </a>
//                 </li>
//                 <li>
//                   <span className="cite-num">2</span>
//                   <a
//                     href="https://github.com/olivia-em"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <em>Github</em>
//                   </a>
//                 </li>
//                 <li>
//                   <span className="cite-num">3</span>
//                   <a
//                     href="https://www.instagram.com/oli.via.online/"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <em>Instagram</em>
//                   </a>
//                 </li>
//               </ul>
//               {/* Tag cloud at bottom of nav */}
//               <div className="magazine-tag-cloud">
//                 {allTags.map((tag) => (
//                   <span
//                     key={tag}
//                     className={
//                       "project-tag-cloud" +
//                       (glowingTags.includes(tag) ? " tag-glow" : "")
//                     }
//                     style={{ margin: "0 0.4em 0.4em 0", cursor: "pointer" }}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </aside>
//           </div>
//           {/* Right/content area: MagazineHome scrollable content */}
//           <div
//             className="app-right"
//             style={{
//               flex: 1,
//               height: "100vh",
//               overflowY: "auto",
//               position: "relative",
//               zIndex: 20,
//             }}
//           >
//             <MagazineHome setGlowingTags={setGlowingTags} />
//           </div>
//         </div>
//       </TagGlowContext.Provider>
//     </HomeProvider>
//   );
// }

// // MainRoutes handles all routing and transitions inside the right column

// function MainRoutes() {
//   const location = useLocation();
//   const isHome = location.pathname === "/";
//   React.useEffect(() => {
//     // Debug location changes
//     // eslint-disable-next-line no-console
//     console.debug(
//       "[ROUTER] location changed:",
//       location.pathname,
//       location.key,
//     );
//   }, [location]);
//   return (
//     <div
//       className="app-right"
//       style={{
//         flex: 1,
//         height: "100vh",
//         overflowY: "auto",
//         position: "relative",
//         zIndex: 20,
//       }}
//     >
//       {/* Home collage is always rendered at the base */}
//       <MagazineHome onlyCollage />
//       {/* Overlay for routed pages, animates in/out above the collage */}
//       {/* Overlay for routed pages, no animation */}
//       {!isHome && (
//         <div
//           key={location.key}
//           style={{
//             height: "100%",
//             background: "#fff",
//             boxShadow: "0 0 24px 0 rgba(0,0,0,0.04)",
//             zIndex: 30,
//             mixBlendMode: "normal",
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//           }}
//         >
//           <Routes location={location} key={location.key}>
//             <Route
//               path="/canvas"
//               element={<WallCanvas shelves={data.shelves} />}
//             />
//             <Route path="/works/webart" element={<WebArtPage />} />
//             <Route path="/works/design" element={<DesignPage />} />
//             <Route path="/works/videoart" element={<VideoArtPage />} />
//             <Route path="/works/lessons" element={<LessonsInPerspective />} />
//             <Route path="/works/newvoices" element={<NewVoicesPage />} />
//             <Route path="/works/staticdesign" element={<CollagePage />} />
//             <Route
//               path="/works/installation/girltime"
//               element={<GirlTimePage />}
//             />
//             <Route
//               path="/works/installation/saintbreak"
//               element={<SaintBreakPage />}
//             />
//             <Route
//               path="/works/installation/tinydesk"
//               element={<TinyDeskPage />}
//             />
//             <Route
//               path="/works/designprojects/collex"
//               element={<CollexPage />}
//             />
//             <Route path="/works/:category/:slug" element={<ProjectPage />} />
//             <Route path="/about" element={<AboutPage />} />
//           </Routes>
//           <BackToHomeButton />
//         </div>
//       )}
//     </div>
//   );
// }
