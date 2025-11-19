import React from "react";
import ShelfItem from "./ShelfItem";

export default function Shelf({ shelf, index = 0 }) {
  // vertical spacing per shelf
  const y = -index * 1.6 + 1.6;

  return (
    <group position={[0, y, 0]}>
      {/* Shelf title as HTML overlay using three's Html could be used, but keep titles in DOM for accessibility */}
      <group position={[-2.6, 0.6, 0]}>
        {/* render items horizontally */}
        {shelf.items.map((item, i) => (
          <ShelfItem key={item.id} item={item} position={[i * 1.2, 0, 0]} />
        ))}
      </group>
    </group>
  );
}
