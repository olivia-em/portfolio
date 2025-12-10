import React from "react";
import { Link } from "react-router-dom";
import "../styles/magazine.css";
import Typewriter from "../components/Typewriter";
import SubtitleTypewriter from "../components/SubtitleTypewriter";
import TocLine from "../components/TocLine";
import TocLineTyped from "../components/TocLineTyped";
import { useHome } from "../contexts/HomeContext";
import projectsData from "../data/projects.json";

export default function MagazineHome() {
  const { homeReady, setHomeReady, typedOnce, setTypedOnce } = useHome();
  const [step, setStep] = React.useState(0);
  const [showCollage, setShowCollage] = React.useState(true); // collage shows immediately
  const [loadedCount, setLoadedCount] = React.useState(0);
  // introActive = true when the initial fullscreen left column + cover should be shown
  const [introActive, setIntroActive] = React.useState(() => !typedOnce);
  // revealed controls whether the white cover has slid away; initialized true when typedOnce
  const [revealed, setRevealed] = React.useState(() => typedOnce);
  // pendingReveal used to wait for images to load before revealing
  const [pendingReveal, setPendingReveal] = React.useState(false);
  // hover state for preview overlay
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const images = [
    "/images/aboutolivia/IMG_1298.JPG",
    "/images/aboutolivia/IMG_1377.jpg",
    "/images/aboutolivia/IMG_9088.JPG",
    "/images/aboutolivia/IMG_9115.jpg",
    "/images/aboutolivia/olivia-alterego.png",
    "/images/aboutolivia/oliviaMOM.PNG",
    "/images/aboutolivia/LIP2.png",
  ];

  // sequence steps (indexes)
  // 0: name
  // 1: subtitle
  // 2: Frontend
  // 3: Lessons in Perspective
  // 4: New Voices
  // 5: Design
  // 6: Video Art
  // 7: Web Art
  // 8: Collage
  // 9: byline
  // 10: citation 1 (Resume)
  // 11: citation 2 (Github)
  // 12: citation 3 (Instagram) / done

  const next = React.useCallback(() => setStep((s) => s + 1), []);

  const finish = React.useCallback(() => {
    console.log("[MAGAZINE] finish() called");
    setTypedOnce(true);
    setHomeReady(true);
    // Set pendingReveal to trigger the reveal once images are loaded
    setPendingReveal(true);
  }, [setTypedOnce, setHomeReady]);

  // if we've already typed once (from sessionStorage), jump to the end
  React.useEffect(() => {
    if (typedOnce) {
      setStep(12);
      // Also trigger reveal immediately if already typed once before
      setRevealed(true);
    }
  }, [typedOnce]);

  // subtitle typing is handled by a dedicated component now; remove the
  // older auto-advance behavior so the subtitle isn't interrupted.

  // debug: log step changes and typedOnce changes to trace sequencing
  React.useEffect(() => {
    console.log(`[MAGAZINE] step -> ${step}`);
  }, [step]);

  React.useEffect(() => {
    console.log(`[MAGAZINE] typedOnce -> ${typedOnce}`);
  }, [typedOnce]);

  React.useEffect(() => {
    console.log(`[MAGAZINE] revealed -> ${revealed}`);
  }, [revealed]);

  React.useEffect(() => {
    console.log(`[MAGAZINE] introActive -> ${introActive}`);
  }, [introActive]);

  // when all collage images have loaded, mark home as ready
  React.useEffect(() => {
    if (loadedCount > 0 && loadedCount >= images.length) {
      setHomeReady(true);
    }
  }, [loadedCount, images.length, setHomeReady]);

  const onImageLoad = React.useCallback(() => setLoadedCount((c) => c + 1), []);

  // when images finish loading, if we were waiting to reveal, trigger it
  React.useEffect(() => {
    console.log("[MAGAZINE] Image load check:", {
      pendingReveal,
      loadedCount,
      totalImages: images.length,
      allLoaded: loadedCount >= images.length,
    });

    if (pendingReveal && loadedCount >= images.length) {
      console.log("[MAGAZINE] All images loaded, triggering reveal");
      setPendingReveal(false);
      // small timeout so layout has painted
      setTimeout(() => {
        console.log("[MAGAZINE] Setting revealed to true");
        setRevealed(true);
      }, 16);
    }
  }, [pendingReveal, loadedCount, images.length]);

  // Trigger the collage-cover reveal right after the TOC 'Collage' item finishes
  // (i.e. when step advances past 8 to 9). This happens only on the initial
  // intro run (when introActive) and if we haven't already revealed.
  React.useEffect(() => {
    if (!introActive) return;
    if (typedOnce) return;
    // step 9 means we just finished step 8 (Collage) and moved on
    if (step === 9 && !revealed) {
      if (loadedCount >= images.length) {
        setRevealed(true);
      } else {
        setPendingReveal(true);
      }
    }
  }, [step, introActive, revealed, loadedCount, images.length, typedOnce]);

  const onCoverTransitionEnd = React.useCallback(
    (e) => {
      // wait for the transform transition to finish and then remove the intro overlay
      if (e.propertyName !== "transform") return;
      console.log(
        "[MAGAZINE] Cover transition ended, introActive:",
        introActive
      );
      if (introActive) {
        // clear the intro flag after the cover transition
        setTimeout(() => {
          console.log("[MAGAZINE] Setting introActive to false");
          setIntroActive(false);
        }, 30);
      }
    },
    [introActive]
  );

  // Get preview data for hovered item
  const getPreviewData = (itemId) => {
    // Check if it's a shelf (section)
    const shelf = projectsData.shelves.find((s) => s.id === itemId);
    if (shelf) {
      let images = [];

      // If shelf has heroImages array (hand-picked images), use those
      if (shelf.heroImages && Array.isArray(shelf.heroImages)) {
        images = [...shelf.heroImages];
      }
      // Otherwise, build from heroImage + items
      else {
        // If shelf has a heroImage, use it first
        if (shelf.heroImage) {
          images.push(shelf.heroImage);
        }

        // Add items from the shelf (up to 3 total)
        if (shelf.items && shelf.items.length > 0) {
          const itemsToAdd = shelf.heroImage ? 2 : 3; // If we already have hero, only add 2 more
          shelf.items.slice(0, itemsToAdd).forEach((item) => {
            // Use thumbnail if available, otherwise use regular image
            const imgSrc = item.thumbnail || item.image;
            if (imgSrc) images.push(imgSrc);
          });
        }
      }

      if (images.length > 0) {
        return {
          images: images.slice(0, 3),
          blurb: shelf.blurb,
        };
      }
    }

    // Check if it's an individual project
    for (const shelf of projectsData.shelves) {
      const item = shelf.items?.find((i) => i.id === itemId);
      if (item && item.heroImage) {
        // For individual items, use main image + extra images
        const images = [item.image];
        if (item.extraImages && item.extraImages.length > 0) {
          images.push(...item.extraImages.slice(0, 2));
        }
        return {
          images: images.slice(0, 3),
          blurb: item.blurb,
        };
      }
    }

    return null;
  };

  const previewData = hoveredItem ? getPreviewData(hoveredItem) : null;

  return (
    <div className={`magazine-root ${introActive ? "intro" : ""}`}>
      <aside className="magazine-left">
        <h1 className="magazine-name">
          <Typewriter
            text="Olivia Lee"
            start={step === 0 || typedOnce}
            onComplete={next}
            instant={typedOnce}
          />
          <span className="cite-sup" aria-hidden>
            1
          </span>
        </h1>
        <h2 className="magazine-name">
          <i>
            <SubtitleTypewriter
              tokens={[
                { type: "text", content: "Multimedia" },
                { type: "sup", content: "2" },
                { type: "text", content: "\u00A0Designer" },
                { type: "sup", content: "3" },
              ]}
              start={step === 1 || typedOnce}
              onComplete={next}
              instant={typedOnce}
            />
          </i>
        </h2>
        <nav className="magazine-toc">
          <ul>
            <li>
              {/* <div className="toc-category">
                <Typewriter
                  text="Frontend"
                  start={step === 2 || typedOnce}
                  onComplete={next}
                  instant={typedOnce}
                />
              </div> */}

              <ul className={`toc-dropdown`}>
                <li>
                  <Link
                    to="/works/lessons"
                    onMouseEnter={() => setHoveredItem("lip")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <TocLineTyped
                      title="Lessons in Perspective"
                      page={1}
                      start={step === 3 || typedOnce}
                      onComplete={next}
                      instant={typedOnce}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/works/newvoices"
                    onMouseEnter={() => setHoveredItem("newvoices")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <TocLineTyped
                      title="New Voices"
                      page={2}
                      start={step === 4 || typedOnce}
                      onComplete={next}
                      instant={typedOnce}
                    />
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <ul className={`toc-dropdown`}>
                <li>
                  <Link
                    to="/works/videoart"
                    onMouseEnter={() => setHoveredItem("videoart")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <TocLineTyped
                      title="Video Art"
                      page={"3"}
                      start={step === 6 || typedOnce}
                      onComplete={next}
                      instant={typedOnce}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/works/webart"
                    onMouseEnter={() => setHoveredItem("webart")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <TocLineTyped
                      title="Creative Coding"
                      page={4}
                      start={step === 7 || typedOnce}
                      onComplete={next}
                      instant={typedOnce}
                    />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/works/collage"
                    onMouseEnter={() => setHoveredItem("collage")}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <TocLineTyped
                      title="Static Art & Collage"
                      page={5}
                      start={step === 8 || typedOnce}
                      onComplete={next}
                      instant={typedOnce}
                    />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="magazine-about">
          <p>
            <Typewriter
              text={`I'm a multimedia designer and creative technologist based in Brooklyn, and I'm interested in poetics, audio/visual technology, production design, and interactive web art. My skillset includes HTML, CSS, and Javascript frameworks, such as React & Three.js, as well as audio/visual softwares like Resolume Arena, Ableton, TouchDesigner, GrandMA Lighting Consoles, and Adobe Suite. I have experience designing and developing websites, interactive media installations, live visuals for performance, and video art pieces.`}
              start={step === 9 || typedOnce}
              instant={typedOnce}
              onComplete={next}
            />
          </p>
        </div>
        <ul className="magazine-citations">
          <li>
            <span className="cite-num">1</span>
            <a
              href="/portfolio/images/aboutolivia/Lee.Olivia_Resume_Dev.pdf"
              target="_blank"
              rel="noopener noreferrer"
              // open as a direct file link to avoid SPA routing
            >
              <em>
                <Typewriter
                  text="Resume"
                  start={step === 10 || typedOnce}
                  onComplete={next}
                  instant={typedOnce}
                />
              </em>
            </a>
          </li>
          <li>
            <span className="cite-num">2</span>
            <a
              href="https://github.com/olivia-em"
              target="_blank"
              rel="noopener noreferrer"
            >
              <em>
                <Typewriter
                  text="Github"
                  start={step === 11 || typedOnce}
                  onComplete={next}
                  instant={typedOnce}
                />
              </em>
            </a>
          </li>
          <li>
            <span className="cite-num">3</span>
            <a
              href="https://www.instagram.com/oli.via.online/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <em>
                <Typewriter
                  text="Instagram"
                  start={step === 12 || typedOnce}
                  onComplete={finish}
                  instant={typedOnce}
                />
              </em>
            </a>
          </li>
        </ul>
      </aside>

      <section className="magazine-right">
        <div className="collage-wrap">
          <div
            className={`collage ${previewData ? "blurred" : ""}`}
            aria-hidden={!showCollage}
          >
            {showCollage &&
              images.map((src, i) => (
                <img
                  key={src}
                  src={`${import.meta.env.BASE_URL}${src}`}
                  className={`c-img c-img-${i + 1}`}
                  alt={`Olivia collage ${i + 1}`}
                  loading="lazy"
                  onLoad={onImageLoad}
                />
              ))}
          </div>

          {/* Preview overlay on hover */}
          {previewData && (
            <div className="preview-overlay">
              <div className="preview-images-center">
                <div className="preview-images-stack">
                  {previewData.images[0] && (
                    <>
                      <img
                        src={`${import.meta.env.BASE_URL}${
                          previewData.images[0]
                        }`}
                        alt="Preview"
                        className="preview-image preview-image-1"
                      />
                      <span className="preview-blurb">{previewData.blurb}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* white cover that slides left on first-run reveal */}
          {introActive && (
            <div
              className={`collage-cover ${revealed ? "reveal" : ""}`}
              onTransitionEnd={onCoverTransitionEnd}
            />
          )}
        </div>
      </section>
    </div>
  );
}
