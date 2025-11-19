import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import ImagePlane from "./ImagePlane";
import CarouselShelf from "./CarouselShelf";
import Preloader from "./Preloader";

function WallScene({
  shelves,
  onTextureLoad,
  thumbWidth = 1.5,
  thumbHeight = 0.95,
  useVerticalLayout = true,
}) {
  const { camera, gl, size } = useThree();
  const [shelfPositions, setShelfPositions] = useState({
    positions: [],
    widths: null,
    heights: null,
  });
  const [positionsReady, setPositionsReady] = useState(false);

  // Update camera aspect when size changes
  useEffect(() => {
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    console.log(
      "Size changed:",
      size.width,
      "x",
      size.height,
      "aspect:",
      camera.aspect
    );
  }, [size, camera]);

  // ensure renderer color/output is correct for sRGB textures
  useEffect(() => {
    try {
      if (
        typeof gl.outputColorSpace !== "undefined" &&
        typeof THREE.SRGBColorSpace !== "undefined"
      ) {
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }
    } catch (e) {
      // ignore if properties don't exist on this three/renderer version
    }

    // enable shadows where supported
    try {
      gl.shadowMap.enabled = true;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch (e) {}
  }, [gl]);

  useFrame(() => {
    const dist = Math.abs(camera.position.z || 1);
    const vFOV = (camera.fov * Math.PI) / 180;
    const viewHeight = 2 * Math.tan(vFOV / 2) * dist;
    const viewWidth = viewHeight * camera.aspect;

    if (useVerticalLayout) {
      // Vertical layout: position shelves along X-axis (left to right)
      // Custom widths for each shelf:
      // Shelf 0 (frontend): 3x base
      // Shelf 1 (webart): 2x base
      // Shelves 2-4 (videoart, design, installation): equal, fitted to remaining space

      const baseWidth = thumbWidth; // 1.5 is the base unit
      const shelf0Width = baseWidth * 3; // frontend: 3x (increased from 2.5x)
      const shelf1Width = baseWidth * 2; // webart: 2x (increased from 1.5x)

      // Calculate width for remaining 3 shelves to fill available space
      // Reserve space for proportional gaps
      const baseGap = 0.15; // Base gap size

      // Proportional gaps based on shelf width ratios
      const gap0 = baseGap * 3; // After frontend (3x shelf)
      const gap1 = baseGap * 2; // After webart (2x shelf)
      const gapRemaining = baseGap * 1; // After smaller shelves

      const totalGaps =
        baseGap + gap0 + gap1 + gapRemaining + gapRemaining + baseGap; // margins + between shelves
      const usedWidth = shelf0Width + shelf1Width;
      const availableForRemainingAndGaps = viewWidth - usedWidth;
      const availableForRemaining = availableForRemainingAndGaps - totalGaps;
      const remainingShelfWidth = availableForRemaining / 3;

      const shelfWidths = [
        shelf0Width, // frontend
        shelf1Width, // webart
        remainingShelfWidth, // videoart
        remainingShelfWidth, // design
        remainingShelfWidth, // installation
      ];

      // Calculate gaps proportional to shelf widths
      const gaps = [
        baseGap, // left margin
        gap0, // after frontend
        gap1, // after webart
        gapRemaining, // after videoart
        gapRemaining, // after design
        baseGap, // right margin (after installation)
      ];

      const positions = shelves.map((shelf, sIdx) => {
        // Calculate position: sum of all previous widths + gaps
        let pos = -viewWidth / 2 + gaps[0]; // start with left margin
        for (let i = 0; i < sIdx; i++) {
          pos += shelfWidths[i] + gaps[i + 1];
        }
        pos += shelfWidths[sIdx] / 2; // add half of current width to get center
        return pos;
      });

      // Store widths for CarouselShelf to use
      if (
        !shelfPositions.widths ||
        shelfPositions.widths[0] !== shelfWidths[0]
      ) {
        setShelfPositions({ positions, widths: shelfWidths });
        setPositionsReady(true);
      } else if (
        shelfPositions.positions?.length === 0 ||
        Math.abs(positions[0] - (shelfPositions.positions?.[0] || 0)) > 0.01
      ) {
        setShelfPositions({ positions, widths: shelfWidths });
        setPositionsReady(true);
      }
    } else {
      // Horizontal layout: position shelves along Y-axis (top to bottom)
      // Apply same proportional sizing as vertical layout:
      // Shelf 0 (frontend): 2x base
      // Shelf 1 (webart): 1x base
      // Shelves 2-4 (videoart, design, installation): equal size

      const baseHeight = thumbHeight; // 1 is the base unit
      const shelf0Height = baseHeight * 2; // frontend: 2x
      const shelf1Height = baseHeight * 1; // webart: 1x
      const remainingShelfHeight = baseHeight * 1; // Same as base for remaining shelves

      const shelfHeights = [
        shelf0Height, // frontend
        shelf1Height, // webart
        remainingShelfHeight, // videoart
        remainingShelfHeight, // design
        remainingShelfHeight, // installation
      ];

      const verticalGap = 0.15; // Space between shelves
      const topMargin = 0.15;

      const positions = shelves.map((shelf, sIdx) => {
        // Calculate position: start from top and move down
        let pos = viewHeight / 2 - topMargin;
        for (let i = 0; i < sIdx; i++) {
          pos -= shelfHeights[i] + verticalGap;
        }
        pos -= shelfHeights[sIdx] / 2; // subtract half of current height to get center
        return pos;
      });

      // Only update if positions changed significantly
      if (
        !shelfPositions.heights ||
        shelfPositions.heights[0] !== shelfHeights[0]
      ) {
        setShelfPositions({ positions, widths: null, heights: shelfHeights });
        setPositionsReady(true);
      } else if (
        shelfPositions.positions?.length === 0 ||
        Math.abs(positions[0] - (shelfPositions.positions?.[0] || 0)) > 0.01
      ) {
        setShelfPositions({ positions, widths: null, heights: shelfHeights });
        setPositionsReady(true);
      }
    }
  });

  // render shelves stacked along positive X (left to right)
  return (
    <group>
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x888888}
        intensity={0.9}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      {/* Only render shelves once positions are ready */}
      {positionsReady &&
        shelves.map((shelf, sIdx) => {
          const pos =
            shelfPositions.positions?.[sIdx] || shelfPositions[sIdx] || 0;
          const width = shelfPositions.widths?.[sIdx] || thumbWidth;
          const height = shelfPositions.heights?.[sIdx] || thumbHeight;

          console.log(
            `Shelf ${shelf.id} (index ${sIdx}): ${
              shelf.items?.length || 0
            } textures, width: ${width.toFixed(2)}, height: ${height.toFixed(
              2
            )}`
          );

          return useVerticalLayout ? (
            <CarouselShelf
              key={`${shelf.id}-vertical`}
              shelf={shelf}
              position={pos}
              thumbWidth={width}
              gap={0.2}
              onTextureLoad={onTextureLoad}
            />
          ) : (
            <CarouselShelf
              key={`${shelf.id}-horizontal`}
              shelf={shelf}
              yPosition={pos}
              thumbHeight={height}
              gap={0.15}
              onTextureLoad={onTextureLoad}
            />
          );
        })}
    </group>
  );
}

export default function WallCanvas({ shelves }) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const wallRef = useRef();
  const [texturesReady, setTexturesReady] = useState(false);
  const loadedTexturesCount = useRef(0);
  const totalTextures = useRef(0);
  const [canvasLeft, setCanvasLeft] = useState(250);
  const [useVerticalLayout, setUseVerticalLayout] = useState(true);

  useEffect(() => {
    // simple WebGL availability check
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (gl) setEnabled(true);
    } catch (e) {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    // Count unique textures (not duplicated carousel items)
    const uniqueUrls = new Set();
    shelves.forEach((shelf) => {
      shelf.items?.forEach((item) => {
        uniqueUrls.add(item.image);
      });
    });
    totalTextures.current = uniqueUrls.size;
    console.log(`Total unique textures to load: ${totalTextures.current}`);
  }, [shelves]);

  const onTextureLoad = () => {
    loadedTexturesCount.current++;
    console.log(
      `Loaded ${loadedTexturesCount.current}/${totalTextures.current} textures`
    );
    if (loadedTexturesCount.current >= totalTextures.current) {
      console.log("All textures loaded! Waiting for GPU upload...");
      setTimeout(() => {
        console.log("Setting loading to false");
        setTexturesReady(true);
      }, 500);
    }
  };

  useEffect(() => {
    if (texturesReady) {
      setLoading(false);
    }
  }, [texturesReady]);

  // Layout and canvas sizing effect
  useEffect(() => {
    if (!enabled) return;

    const checkLayout = () => {
      // Determine whether to use the vertical (wall) layout based on width.
      const minWidthForVertical = 1000; // breakpoint
      const shouldUseVertical = window.innerWidth >= minWidthForVertical;

      // If layout is changing, show preloader briefly
      if (shouldUseVertical !== useVerticalLayout) {
        setLoading(true);
        setTimeout(() => setLoading(false), 300);
      }

      setUseVerticalLayout(shouldUseVertical);

      // No sidebar in current layout: canvas is full-width
      setCanvasLeft(0);
    };

    checkLayout();
    window.addEventListener("resize", checkLayout);

    document.documentElement.classList.add("has-wall-canvas");
    const prevOverflow = document.body.style.overflow;

    // Only prevent scrolling in vertical layout
    if (useVerticalLayout) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("resize", checkLayout);
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("has-wall-canvas");
    };
  }, [enabled, shelves, useVerticalLayout]);

  if (!enabled) return <Preloader />;

  return (
    <>
      {loading && <Preloader />}
      <div
        ref={wallRef}
        className="canvas-fullscreen"
        style={{
          position: useVerticalLayout ? "fixed" : "relative",
          top: 0,
          left: useVerticalLayout ? `${canvasLeft}px` : 0,
          width: useVerticalLayout ? `calc(100vw - ${canvasLeft}px)` : "100%",
          height: useVerticalLayout ? "100vh" : "200vh",
          zIndex: 0,
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 8], fov: 45 }}
          resize={{ scroll: false, debounce: 0 }}
          gl={{
            powerPreference: "high-performance",
            antialias: true,
          }}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl, camera }) => {
            // Force update camera aspect ratio
            const rect = gl.domElement.getBoundingClientRect();
            camera.aspect = rect.width / rect.height;
            camera.updateProjectionMatrix();
            console.log("Canvas created:", rect.width, "x", rect.height);
            console.log("Camera aspect:", camera.aspect);
          }}
        >
          <Suspense fallback={null}>
            <WallScene
              shelves={shelves}
              onTextureLoad={onTextureLoad}
              useVerticalLayout={useVerticalLayout}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
