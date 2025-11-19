import React, { useMemo, useEffect, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { SRGBColorSpace } from "three";

export default function ShelfItem({ item, position = [0, 0, 0] }) {
  const navigate = useNavigate();

  // useTexture may return a Texture or an array of Textures depending on input
  const raw = useTexture(item.image);
  const texture = Array.isArray(raw) ? raw[0] : raw;

  // track aspect ratio once the image has loaded
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    if (!texture) return;
    // set correct color space for accurate colors (three r180+ uses colorSpace)
    try {
      if ("colorSpace" in texture) {
        texture.colorSpace = SRGBColorSpace;
      } else if ("encoding" in texture) {
        // fallback for older three versions
        texture.encoding = SRGBColorSpace;
      }
    } catch (e) {
      // ignore if texture doesn't support these properties
    }

    const img = texture.image;
    if (img && img.width && img.height) {
      setAspect(img.width / img.height);
      console.log(
        `ShelfItem: loaded image for ${item.id}`,
        texture?.image?.src || texture?.image
      );
    } else {
      // if image not yet loaded, listen for its load event (HTMLImageElement)
      const handle = () => {
        if (texture.image && texture.image.width && texture.image.height) {
          setAspect(texture.image.width / texture.image.height);
          console.log(
            `ShelfItem: image load event for ${item.id}`,
            texture.image && texture.image.src
              ? texture.image.src
              : texture.image
          );
        }
      };
      if (img && img.addEventListener) {
        img.addEventListener("load", handle);
        // cleanup
        return () => img.removeEventListener("load", handle);
      }
    }
  }, [texture]);

  const handleClick = () => {
    if (item.route) navigate(item.route);
  };

  // compute geometry size: fixed height per thumbnail, variable width by aspect
  const height = 0.9; // reasonable uniform visual height for all thumbnails
  const width = useMemo(() => {
    // clamp width to avoid extreme sizes
    const w = Math.max(0.5, Math.min(2.0, aspect * height));
    return w;
  }, [aspect]);

  return (
    <group position={position}>
      <mesh onClick={handleClick}>
        <planeGeometry args={[width, height]} />
        {texture && texture.image ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color={0xf0f0f0} />
        )}
      </mesh>
    </group>
  );
}
