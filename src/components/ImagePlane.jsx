import React, { useEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ImagePlane({
  url,
  position = [0, 0, 0],
  width,
  height,
  onClick = () => {},
  onPointerOver = () => {},
  onPointerOut = () => {},
  onTextureLoad = () => {},
}) {
  const texture = useTexture(url);
  const notifiedRef = useRef(false);

  // compute dimensions based on aspect ratio
  // if width is provided, compute height from aspect
  // if height is provided, compute width from aspect
  const { finalWidth, finalHeight } = useMemo(() => {
    if (texture && texture.image) {
      const w = texture.image.width || 1;
      const h = texture.image.height || 1;
      const aspectRatio = h / w;

      if (width) {
        return { finalWidth: width, finalHeight: aspectRatio * width };
      } else if (height) {
        return { finalWidth: height / aspectRatio, finalHeight: height };
      }
    }
    return {
      finalWidth: width || height || 1,
      finalHeight: height || width || 1,
    };
  }, [texture, width, height]);

  useEffect(() => {
    if (!texture || notifiedRef.current) return;
    // prefer SRGB color space for color-correct rendering if available
    if (typeof THREE.SRGBColorSpace !== "undefined") {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.anisotropy = 4;
    texture.needsUpdate = true;

    // notify parent that this texture is loaded (only once)
    notifiedRef.current = true;
    onTextureLoad();
  }, [texture, onTextureLoad]);

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <planeGeometry args={[finalWidth, finalHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}
