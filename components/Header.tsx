"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { announcements, mainNav } from "@/lib/site";
import { Wordmark } from "./Logo";
import { useStore } from "./StoreProvider";

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % announcements.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <aside className="announce" aria-label="Announcements">
      {announcements.map((a, n) => (
        <p key={a} className={n === i ? "is-active" : ""} aria-hidden={n !== i}>
          {a}
        </p>
      ))}
    </aside>
  );
}

/** Pages whose first section is full-bleed media, so the header starts white and overlays it. */
const OVERLAY = [/^\/$/, /^\/products\//];

export function Header() {
  const pathname = usePathname();
  const { count, openDrawer } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const overlay = OVERLAY.some((r) => r.test(pathname));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overlay && (!scrolled || pathname.startsWith("/products/"));

  return (
    <header className={`site-header ${overlay ? "is-overlay" : ""} ${light ? "is-light" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <nav className="header-left" aria-label="Main">
          <button className="hlink only-mobile" onClick={() => openDrawer("menu")}>
            Menu
          </button>
          {mainNav.map((n) => (
            <Link key={n.href} href={n.href} className="hlink only-desktop">
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="header-logo" aria-label="Mithrak home">
          <Wordmark />
        </Link>
        <div className="header-right">
          <Link href="/account" className="hlink only-desktop">
            Account
          </Link>
          <button className="hlink" onClick={() => openDrawer("cart")} aria-label={`Cart, ${count} items`}>
            Cart{count > 0 && <span className="cart-count"> ({count})</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
