import React from "react";
import DomShelfItem from "./DomShelfItem";

export default function DomShelf({ shelf }) {
  return (
    <section className="shelf">
      <h2 className="shelf-title">{shelf.title}</h2>
      <div className="shelf-frame">
        <div className="shelf-items">
          {shelf.items.map((item) => (
            <DomShelfItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
