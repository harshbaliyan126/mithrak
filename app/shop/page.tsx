import type { Metadata } from "next";
import { WorkInProgress } from "@/components/WorkInProgress";

export const metadata: Metadata = { title: "Work in progress" };

// Work in progress: every page except the homepage shows a placeholder for now.
// The original page is kept below, commented out. To restore it, delete everything
// above the comment block and remove the comment markers.
export default function Shop() {
  return <WorkInProgress />;
}

/* ---- Original page (disabled) ----
import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { collectionIntro } from "@/lib/site";

export const metadata: Metadata = { title: "Shop" };

export default function Shop() {
  return (
    <>
      <header className="collection-intro">
        <h1 className="visually-hidden">All fragrances</h1>
        {collectionIntro.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </header>
      <section className="collection-grid">
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 3} />
        ))}
      </section>
    </>
  );
}
---- end original page ---- */
