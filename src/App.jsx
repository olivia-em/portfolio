import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// Header (sidebar) removed — homepage and other pages no longer render it.
import WallCanvas from "./components/WallCanvas";
import ProjectPage from "./pages/ProjectPage";
import WebArtPage from "./pages/WebArtPage";
import DesignPage from "./pages/DesignPage";
import VideoArtPage from "./pages/VideoArtPage";
import MagazineHome from "./pages/MagazineHome";
import LessonsInPerspective from "./pages/LessonsInPerspective";
import NewVoicesPage from "./pages/NewVoicesPage";
import CollagePage from "./pages/CollagePage";
import GirlTimePage from "./pages/GirlTimePage";
import TinyDeskPage from "./pages/TinyDeskPage";
import data from "./data/projects.json";
import { HomeProvider, useHome } from "./contexts/HomeContext";

function AppContent() {
  const location = useLocation();
  const { homeReady } = useHome();

  // overlayLoc holds the last non-root location while returning to root we keep
  // the overlay mounted until homeReady becomes true so the slide-down reveals home.
  const [overlayLoc, setOverlayLoc] = React.useState(
    location.pathname === "/" ? null : location
  );
  const [isClosing, setIsClosing] = React.useState(false);
  const [animatingOut, setAnimatingOut] = React.useState(false);
  const enterStartRef = React.useRef(null);
  const exitStartRef = React.useRef(null);

  // Manage overlay location and closing lifecycle
  React.useEffect(() => {
    if (location.pathname === "/") {
      // Only begin closing if we actually have an overlay mounted (i.e. the
      // user is navigating back from a non-root route). On initial load
      // overlayLoc will be null and we should not begin a closing sequence.
      if (overlayLoc) {
        setIsClosing(true);
      }
    } else {
      // navigating to a non-root route: render overlay for the new location
      enterStartRef.current = performance.now();
      console.log("overlay: start enter for", location.pathname);
      setOverlayLoc(location);
      setIsClosing(false);
    }
  }, [location]);

  // When closing intent is set and the home reports ready, remove the overlay
  // to start the exit animation (AnimatePresence will play the exit). We
  // then clear `isClosing` in onExitComplete.
  React.useEffect(() => {
    if (isClosing && homeReady) {
      // begin exit: record start time then remove overlay so AnimatePresence
      // will run the exit animation.
      exitStartRef.current = performance.now();
      console.log(
        "overlay: begin exit — homeReady true, starting controlled exit"
      );
      setAnimatingOut(true);
    }
  }, [isClosing, homeReady]);

  return (
    <div className="app-root">
      {/* MagazineHome stays mounted beneath overlays so it won't re-run on return */}
      <MagazineHome />

      {/* overlays for non-root routes (controlled animation) */}
      {/* We render the overlay while we have an `overlayLoc` OR while
          we're animating out; this keeps the overlay mounted during its
          exit animation so we can control when it's removed. */}
      {(overlayLoc || animatingOut) && (
        <motion.div
          key={overlayLoc ? overlayLoc.key ?? overlayLoc.pathname : "overlay"}
          initial={{ y: "100vh" }}
          animate={{ y: animatingOut ? "100vh" : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overlay-route"
          style={{ position: "fixed", inset: 0, zIndex: 40 }}
          onAnimationComplete={() => {
            // Called when either animate (enter) or animate (exit) completes.
            if (!animatingOut && enterStartRef.current) {
              const dur = Math.round(performance.now() - enterStartRef.current);
              console.log("overlay: enter complete", dur + "ms");
              enterStartRef.current = null;
              return;
            }

            if (animatingOut) {
              const dur = exitStartRef.current
                ? Math.round(performance.now() - exitStartRef.current)
                : null;
              console.log(
                "overlay: controlled exit complete",
                dur ? dur + "ms" : "(no start)"
              );
              // now fully unmount overlay and clear flags
              setAnimatingOut(false);
              setOverlayLoc(null);
              setIsClosing(false);
            }
          }}
        >
          <Routes location={overlayLoc}>
            <Route
              path="/canvas"
              element={
                <div className="canvas-wrap">
                  <WallCanvas shelves={data.shelves} />
                </div>
              }
            />
            <Route path="/works/webart" element={<WebArtPage />} />
            <Route path="/works/design" element={<DesignPage />} />
            <Route path="/works/videoart" element={<VideoArtPage />} />
            <Route path="/works/lessons" element={<LessonsInPerspective />} />
            <Route path="/works/newvoices" element={<NewVoicesPage />} />
            <Route path="/works/collage" element={<CollagePage />} />
            <Route
              path="/works/installation/girltime"
              element={<GirlTimePage />}
            />
            <Route
              path="/works/installation/tinydesk"
              element={<TinyDeskPage />}
            />
            <Route path="/works/:category/:slug" element={<ProjectPage />} />
          </Routes>
        </motion.div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <HomeProvider>
      <AppContent />
    </HomeProvider>
  );
}
