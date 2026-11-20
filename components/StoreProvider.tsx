"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

export type CartLine = { slug: string; size: string; qty: number };
type Drawer = "cart" | "menu" | null;

type Store = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  drawer: Drawer;
  openDrawer: (d: Drawer) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "mithrak-cart-v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawer, setDrawer] = useState<Drawer>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  // Lock page scroll while a drawer is open; close on Escape.
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setLines((ls) => {
      const hit = ls.find((l) => l.slug === slug && l.size === size);
      if (hit) return ls.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l));
      return [...ls, { slug, size, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((ls) =>
      qty <= 0
        ? ls.filter((l) => !(l.slug === slug && l.size === size))
        : ls.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => setQty(slug, size, 0), [setQty]);

  const value = useMemo<Store>(() => {
    let count = 0;
    let subtotal = 0;
    for (const l of lines) {
      const price = getProduct(l.slug)?.sizes.find((s) => s.label === l.size)?.price ?? 0;
      count += l.qty;
      subtotal += price * l.qty;
    }
    return { lines, count, subtotal, add, setQty, remove, drawer, openDrawer: setDrawer };
  }, [lines, drawer, add, setQty, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}
