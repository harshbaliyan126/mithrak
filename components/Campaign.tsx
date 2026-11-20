"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { Ambient } from "./Ambient";
import { Bottle } from "./Bottle";
import { PauseIcon, PlayIcon } from "./Icons";

/** Full-bleed media with a centred frosted card (Lore's campaign block). */
export function Campaign({ product: p, video, zoom }: { product: Product; video?: string; zoom?: number }) {
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const section = useRef<HTMLElement>(null);

  // Only play while the section is on screen (saves data and battery).
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "200px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="campaign" ref={section}>
      <Ambient video={video ?? p.video} colors={p.gradient} paused={paused || !inView} zoom={zoom} />
      <div className="campaign-stack">
        <div className="campaign-card glass">
          <p className="label">{p.name}</p>
          <div className="campaign-media">
            <Bottle liquid={p.liquid} name="campaign" set={p.family === "Set"} />
          </div>
          <p className="campaign-tag">{p.tagline}</p>
        </div>
        <div className="campaign-actions">
          <button className="glass" aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused((x) => !x)}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <Link href={`/products/${p.slug}`} className="glass label">
            Discover
          </Link>
        </div>
      </div>
    </section>
  );
}
