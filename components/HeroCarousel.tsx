"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { Ambient } from "./Ambient";
import { Bottle } from "./Bottle";
import { MuteIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, SoundIcon } from "./Icons";

export type HeroSlide = { product: Product; video?: string; zoom?: number };

/** Used only for slides without a video; video slides advance when the video ends. */
const IMAGE_DURATION = 8000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const go = useCallback((d: number) => setI((n) => (n + d + slides.length) % slides.length), [slides.length]);

  // Play the active video from the start; pause and rewind the others.
  useEffect(() => {
    videos.current.forEach((v, n) => {
      if (!v) return;
      if (n === i) {
        if (paused) v.pause();
        else v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [i, paused]);

  useEffect(() => {
    videos.current.forEach((v) => v && (v.muted = muted));
  }, [muted]);

  // Timed advance for slides that have no video.
  useEffect(() => {
    if (paused || slides[i].video) return;
    const t = setTimeout(() => go(1), IMAGE_DURATION);
    return () => clearTimeout(t);
  }, [i, paused, go, slides]);

  const p = slides[i].product;

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="Now playing">
      {slides.map((s, n) => (
        <div key={s.product.slug + n} className={`hero-slide ${n === i ? "is-active" : ""}`} aria-hidden={n !== i}>
          {s.video ? (
            <video
              ref={(el) => {
                videos.current[n] = el;
              }}
              className="hero-video"
              src={s.video}
              style={s.zoom ? { transform: `scale(${s.zoom})` } : undefined}
              muted
              playsInline
              autoPlay={n === 0}
              loop={slides.length === 1}
              preload={n === 0 ? "auto" : "metadata"}
              onEnded={() => go(1)}
            />
          ) : (
            <Ambient colors={s.product.gradient} paused={paused || n !== i} />
          )}
        </div>
      ))}

      <div className="now-playing">
        <Link href={`/products/${p.slug}`} className="np-card glass" key={p.slug}>
          <p className="label">Now playing</p>
          <div className="np-media">
            <Bottle liquid={p.liquid} name={`np-${p.slug}`} set={p.family === "Set"} />
          </div>
          <div className="np-text">
            <p className="np-name">{p.name}</p>
            <p className="label">{p.kind}</p>
          </div>
        </Link>
        <div className="np-controls">
          <button className="glass" aria-label="Previous" onClick={() => go(-1)}>
            <PrevIcon />
          </button>
          <button className="glass" aria-label="Next" onClick={() => go(1)}>
            <NextIcon />
          </button>
          <button className="glass" aria-label={paused ? "Play" : "Pause"} onClick={() => setPaused((x) => !x)}>
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button className="glass" aria-label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((x) => !x)}>
            {muted ? <MuteIcon /> : <SoundIcon />}
          </button>
        </div>
      </div>
    </section>
  );
}
