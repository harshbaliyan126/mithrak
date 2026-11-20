"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import { ProductMedia } from "./ProductMedia";
import { useStore } from "./StoreProvider";

export function ProductCard({ product: p, priority }: { product: Product; priority?: boolean }) {
  const { add, openDrawer } = useStore();
  const [added, setAdded] = useState(false);
  const size = p.sizes[0];

  const quickAdd = () => {
    add(p.slug, size.label);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    setTimeout(() => openDrawer("cart"), 300);
  };

  return (
    <article className="card" style={{ background: p.tint }}>
      {p.badge && <span className="badge">{p.badge}</span>}
      <div className="card-media">
        <ProductMedia product={p} priority={priority} sizes="(max-width: 768px) 60vw, 32vw" />
      </div>
      <div className="card-info">
        <div>
          <h3 className="serif-name">
            <Link href={`/products/${p.slug}`} className="card-link">
              {p.name}
            </Link>
          </h3>
          <p className="label">{p.kind}</p>
        </div>
        <div className="card-price">
          <p className="label">{size.label}</p>
          <p className="label">{formatPrice(size.price)}</p>
        </div>
      </div>
      <button className={`card-add label ${added ? "is-added" : ""}`} onClick={quickAdd} aria-label={`Add ${p.name} to cart`}>
        {added ? "Added" : "Add +"}
      </button>
    </article>
  );
}
