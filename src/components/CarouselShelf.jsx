import React, { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import ImagePlane from "./ImagePlane";

export default function CarouselShelf({
  shelf,
  position, // X position for vertical layout
  yPosition, // Y position for horizontal layout
  thumbWidth, // for vertical layout
  thumbHeight, // for horizontal layout
  gap = 0.2,
  onTextureLoad,
}) {
  const { camera } = useThree();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 }); // State to trigger re-renders
  const wheelHandlerRef = useRef(null);

  // Handle cursor label on hover
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
    // Create or update label
    let label = document.getElementById("shelf-cursor-label");
    if (!label) {
      label = document.createElement("div");
      label.id = "shelf-cursor-label";
      label.style.position = "fixed";
      label.style.pointerEvents = "none";
      label.style.background = "black";
      label.style.color = "white";
      label.style.padding = "4px 8px";
      label.style.fontSize = "12px";
      label.style.borderRadius = "3px";
      label.style.zIndex = "10000";
      label.style.whiteSpace = "nowrap";
      document.body.appendChild(label);
    }
    label.textContent = shelf.title || shelf.id;
    label.style.display = "block";

    // Update position on mouse move
    const moveHandler = (e) => {
      label.style.left = e.clientX + 10 + "px";
      label.style.top = e.clientY + 10 + "px";
    };
    document.addEventListener("pointermove", moveHandler);
    label._moveHandler = moveHandler;
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "default";
    const label = document.getElementById("shelf-cursor-label");
    if (label) {
      label.style.display = "none";
      if (label._moveHandler) {
        document.removeEventListener("pointermove", label._moveHandler);
      }
    }
  };

  // Determine layout mode based on which position prop is provided
  const isVerticalLayout = position !== undefined;

  const items = shelf.items || [];

  // Preload textures to get actual dimensions
  const textureUrls = items.map((item) => item.image);
  const textures = useTexture(textureUrls);
  const texturesArray = Array.isArray(textures) ? textures : [textures];

  // Calculate actual heights for each item based on aspect ratio (vertical layout)
  const itemHeights = useMemo(() => {
    if (!isVerticalLayout) return [];
    return texturesArray.map((texture) => {
      if (!texture || !texture.image) return thumbWidth; // fallback to square
      const aspectRatio = texture.image.height / texture.image.width;
      return thumbWidth * aspectRatio;
    });
  }, [texturesArray, thumbWidth, isVerticalLayout]);

  // Calculate actual widths for each item based on aspect ratio (horizontal layout)
  const itemWidths = useMemo(() => {
    if (isVerticalLayout || !thumbHeight) return [];
    return texturesArray.map((texture) => {
      if (!texture || !texture.image) return thumbHeight; // fallback to square
      const aspectRatio = texture.image.width / texture.image.height;
      return thumbHeight * aspectRatio;
    });
  }, [texturesArray, thumbHeight, isVerticalLayout]);

  // Calculate cumulative positions for each item (storing the CENTER Y position)
  const { itemPositions, totalHeight } = useMemo(() => {
    if (!isVerticalLayout) return { itemPositions: [], totalHeight: 0 };
    const positions = [];
    let currentY = 0;
    itemHeights.forEach((height, idx) => {
      // Store the center position of this item
      positions.push(currentY - height / 2);
      // Move to next item: go down by full height + gap
      currentY -= height + gap;
    });
    // Total height needs to include the gap between last and first item for seamless loop
    // Distance from center of first item to where the next cycle's first item should be
    const total =
      Math.abs(positions[positions.length - 1] - positions[0]) +
      itemHeights[itemHeights.length - 1] / 2 +
      gap +
      itemHeights[0] / 2;
    return { itemPositions: positions, totalHeight: total };
  }, [itemHeights, gap, isVerticalLayout]);

  // For horizontal layout, calculate cumulative X positions and total width
  const { itemXPositions, totalWidth } = useMemo(() => {
    if (isVerticalLayout) return { itemXPositions: [], totalWidth: 0 };
    const positions = [];
    let currentX = 0;
    itemWidths.forEach((width, idx) => {
      // Store the center position of this item
      positions.push(currentX + width / 2);
      // Move to next item: go right by full width + gap
      currentX += width + gap;
    });
    // Total width includes gap between last and first item for seamless loop
    const total =
      Math.abs(positions[positions.length - 1] - positions[0]) +
      itemWidths[itemWidths.length - 1] / 2 +
      gap +
      itemWidths[0] / 2;
    return { itemXPositions: positions, totalWidth: total };
  }, [itemWidths, gap, isVerticalLayout]);

  // Compute visible dimensions at the image plane from perspective camera
  const dist = Math.abs(camera.position.z || 1);
  const vFOV = (camera.fov * Math.PI) / 180;
  const viewHeight = 2 * Math.tan(vFOV / 2) * dist;
  const viewWidth = viewHeight * camera.aspect;

  // Check if shelf should have carousel behavior
  // For vertical layout (desktop): always enable carousel for continuous loop
  // For horizontal layout (mobile): only if content extends beyond view
  const shouldScroll = isVerticalLayout
    ? true // Always scroll in vertical layout
    : totalWidth > viewWidth - 1.0;

  // Add wheel event listener when hovering (only for vertical layout/desktop)
  React.useEffect(() => {
    if (!hovered || !isVerticalLayout || !totalHeight) return;

    const wheelHandler = (e) => {
      e.preventDefault();

      // Mark as actively scrolling
      setIsScrolling(true);

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to mark scrolling as stopped after 150ms of no wheel events
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Scroll the carousel based on wheel delta (reversed direction)
      setScrollOffset((prev) => {
        let newY = prev.y - e.deltaY * 0.003; // Negative to reverse direction

        // Keep within bounds (seamless loop)
        if (newY < 0) {
          newY += totalHeight;
        } else if (newY >= totalHeight) {
          newY -= totalHeight;
        }

        return { ...prev, y: newY };
      });
    };

    document.addEventListener("wheel", wheelHandler, { passive: false });
    wheelHandlerRef.current = wheelHandler;

    return () => {
      if (wheelHandlerRef.current) {
        document.removeEventListener("wheel", wheelHandlerRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [hovered, isVerticalLayout, totalHeight]);

  useFrame((state, delta) => {
    if (!shouldScroll) return;

    // Pause auto-scroll if hovering AND not actively scrolling with wheel
    if (hovered && !isScrolling) return;

    // Auto-scroll speed (units per second)
    const scrollSpeed = 0.3;

    setScrollOffset((prev) => {
      if (isVerticalLayout) {
        // Vertical layout: scroll down (increase Y)
        let newY = prev.y + scrollSpeed * delta;

        // Wrap seamlessly
        if (newY >= totalHeight) {
          newY -= totalHeight;
        }

        return { ...prev, y: newY };
      } else {
        // Horizontal layout: scroll left (increase X)
        let newX = prev.x + scrollSpeed * delta;

        // Wrap seamlessly
        if (newX >= totalWidth) {
          newX -= totalWidth;
        }

        return { x: newX, y: prev.y };
      }
    });
  });

  // Edge positions for item placement
  const topEdge = viewHeight / 2 - 0.5;
  const leftEdge = -viewWidth / 2; // No margin for horizontal cumulative positioning

  // Check if we should show vertical text label (for small shelves in vertical layout)
  const showVerticalLabel = isVerticalLayout && totalHeight < viewHeight * 0.8;

  return (
    <group position={isVerticalLayout ? [position, 0, 0] : [0, yPosition, 0]}>
      <group ref={groupRef}>
        {items.map((item, i) => {
          if (isVerticalLayout) {
            // Vertical layout: Use modulo positioning for seamless loop
            const baseY = itemPositions[i];

            // Calculate wrapped position based on current scroll offset
            // We need to determine which "cycle" this item should appear in
            const normalizedOffset =
              ((scrollOffset.y % totalHeight) + totalHeight) % totalHeight;

            // Calculate where this item should be relative to the current offset
            let relativeY = baseY - normalizedOffset;

            // Wrap around with larger buffer to ensure smooth transitions
            // Wrap if item is well below the bottom of viewport
            if (relativeY < -viewHeight - itemHeights[i]) {
              relativeY += totalHeight;
            }
            // Wrap if item is well above the top of viewport
            else if (relativeY > viewHeight + itemHeights[i]) {
              relativeY -= totalHeight;
            }

            const y = topEdge + relativeY;

            return (
              <ImagePlane
                key={item.id}
                url={item.image}
                position={[0, y, 0]}
                width={thumbWidth}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => {
                  if (shelf.hasIndividualPages) {
                    window.location.href = item.url?.website || item.route;
                  } else {
                    window.location.href = shelf.route;
                  }
                }}
                onTextureLoad={onTextureLoad}
              />
            );
          } else {
            // Horizontal layout: Use modulo positioning for seamless loop
            const baseX = itemXPositions[i];

            if (!shouldScroll) {
              // Static positioning when no scroll needed
              const x = leftEdge + baseX;
              return (
                <ImagePlane
                  key={item.id}
                  url={item.image}
                  position={[x, 0, 0]}
                  height={thumbHeight}
                  onPointerOver={handlePointerOver}
                  onPointerOut={handlePointerOut}
                  onClick={() => {
                    if (shelf.hasIndividualPages) {
                      window.location.href = item.url?.website || item.route;
                    } else {
                      window.location.href = shelf.route;
                    }
                  }}
                  onTextureLoad={onTextureLoad}
                />
              );
            }

            // Calculate wrapped position based on current scroll offset
            const normalizedOffset =
              ((scrollOffset.x % totalWidth) + totalWidth) % totalWidth;

            // Calculate where this item should be relative to the current offset
            let relativeX = baseX - normalizedOffset;

            // Wrap around with larger buffer
            if (relativeX < -viewWidth - itemWidths[i]) {
              relativeX += totalWidth;
            } else if (relativeX > viewWidth + itemWidths[i]) {
              relativeX -= totalWidth;
            }

            const x = leftEdge + relativeX;

            return (
              <ImagePlane
                key={item.id}
                url={item.image}
                position={[x, 0, 0]}
                height={thumbHeight}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={() => {
                  if (shelf.hasIndividualPages) {
                    window.location.href = item.url?.website || item.route;
                  } else {
                    window.location.href = shelf.route;
                  }
                }}
                onTextureLoad={onTextureLoad}
              />
            );
          }
        })}

        {/* Add repeating vertical text labels for small shelves */}
        {showVerticalLabel && isVerticalLayout && (
          <>
            {[0, 1, 2].map((cycle) => {
              const normalizedOffset =
                ((scrollOffset.y % totalHeight) + totalHeight) % totalHeight;
              let textY = -normalizedOffset + cycle * totalHeight;

              // Wrap the text position
              if (textY < -viewHeight * 1.5) {
                textY += totalHeight * 3;
              } else if (textY > viewHeight * 1.5) {
                textY -= totalHeight * 3;
              }

              return (
                <Text
                  key={`label-${cycle}`}
                  position={[0, topEdge + textY - totalHeight / 2 - 1, 0]}
                  rotation={[0, 0, Math.PI / 2]}
                  fontSize={0.3}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  letterSpacing={0.1}
                >
                  {shelf.title}
                </Text>
              );
            })}
          </>
        )}
      </group>
    </group>
  );
}
