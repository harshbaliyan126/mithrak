"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { ChevronLeft, ChevronRight } from "./Icons";
import { ProductCard } from "./ProductCard";

/** Horizontally scrolling product row. Arrow buttons for mouse users (hidden on mobile via CSS). */
export function ProductRail({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  /** Scroll by one card (card width + gap). */
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".card");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="rail" aria-label="Featured products">
      <div className="rail-inner">
        <div className="rail-track" ref={track} onScroll={update}>
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
        <button className="rail-arrow rail-prev" aria-label="Previous products" onClick={() => scroll(-1)} disabled={!canPrev}>
          <ChevronLeft />
        </button>
        <button className="rail-arrow rail-next" aria-label="Next products" onClick={() => scroll(1)} disabled={!canNext}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}
