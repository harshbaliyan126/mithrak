"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/site";
import { Ambient } from "./Ambient";
import { Bottle } from "./Bottle";
import { ChevronDown } from "./Icons";
import { ProductMedia } from "./ProductMedia";
import { useStore } from "./StoreProvider";

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc ${open ? "is-open" : ""}`}>
      <button className="acc-head label" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {title} <ChevronDown />
      </button>
      <div className="acc-body">
        <div>
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
}

/** Placeholder editorial image: photo if provided, else a tinted bottle still life. */
function Still({ p, index, tilt }: { p: Product; index: number; tilt: number }) {
  if (p.images?.[index]) {
    return (
      <div className="pdp-still">
        <ProductMedia product={p} index={index} sizes="(max-width: 900px) 100vw, 480px" />
      </div>
    );
  }
  return (
    <div className="pdp-still" style={{ background: `linear-gradient(160deg, ${p.gradient[0]}, ${p.liquid})` }}>
      <div className="still-wrap" style={{ transform: `rotate(${tilt}deg)` }}>
        <Bottle liquid={p.liquid} name={`still-${p.slug}-${index}`} set={p.family === "Set"} className="still-bottle" />
      </div>
    </div>
  );
}

export function ProductDetail({ product: p }: { product: Product }) {
  const { add, openDrawer } = useStore();
  const [size, setSize] = useState(p.sizes[0]);

  return (
    <div
      className={`pdp ${p.texture && p.textureTone === "light" ? "pdp-light" : ""}`}
      style={{
        background: p.texture
          ? `url("${p.texture}") center / cover fixed`
          : `linear-gradient(180deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
      }}
    >
      <div className="pdp-cols">
        <aside className="pdp-left">
          <p className="pdp-descriptor">{p.descriptor}</p>
        </aside>

        <div className="pdp-center">
          <div className="pdp-hero">
            {p.images?.[0] ? (
              <ProductMedia product={p} index={0} priority sizes="(max-width: 900px) 100vw, 480px" />
            ) : (
              <Bottle liquid={p.liquid} name={`pdp-${p.slug}`} set={p.family === "Set"} className="pdp-bottle" />
            )}
          </div>

          {/* Buy box repeats here on mobile, where the right column is hidden. */}
          <BuyBox p={p} size={size} setSize={setSize} onAdd={() => (add(p.slug, size.label), openDrawer("cart"))} mobile />

          <div className="pdp-story">
            <p>{p.description}</p>
            <p>Perfumer: Mithrak Atelier</p>
            <Accordion title="Wearing it">{p.wearing}</Accordion>
            <Accordion title="Ingredients">{p.ingredients}</Accordion>
          </div>

          <Still p={p} index={1} tilt={-8} />

          <div className="pdp-notes">
            <p className="label">Notes</p>
            {p.notes.map((n) => (
              <p key={n} className="pdp-note">
                {n}
              </p>
            ))}
          </div>

          <Still p={p} index={2} tilt={6} />
          <Still p={p} index={3} tilt={0} />
        </div>

        <aside className="pdp-right">
          <BuyBox p={p} size={size} setSize={setSize} onAdd={() => (add(p.slug, size.label), openDrawer("cart"))} />
        </aside>
      </div>

      <section className="pdp-film">
        <Ambient video={p.video} colors={[p.gradient[1], p.gradient[0]]} />
      </section>
    </div>
  );
}

function BuyBox({
  p,
  size,
  setSize,
  onAdd,
  mobile,
}: {
  p: Product;
  size: Product["sizes"][number];
  setSize: (s: Product["sizes"][number]) => void;
  onAdd: () => void;
  mobile?: boolean;
}) {
  return (
    <div className={`buy ${mobile ? "buy-mobile" : ""}`}>
      <h1 className="buy-name">{p.name}</h1>
      <p className="label">{p.subtitle}</p>
      {p.sizes.length > 1 && (
        <div className="buy-sizes" role="radiogroup" aria-label="Size">
          {p.sizes.map((s) => (
            <button
              key={s.label}
              role="radio"
              aria-checked={s.label === size.label}
              className={`label ${s.label === size.label ? "is-active" : ""}`}
              onClick={() => setSize(s)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <button className="buy-add label" onClick={onAdd}>
        <span>Add to cart</span>
        <span>{formatPrice(size.price)}</span>
      </button>
    </div>
  );
}
