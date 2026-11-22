import type { Metadata } from "next";
import { WorkInProgress } from "@/components/WorkInProgress";

export const metadata: Metadata = { title: "Work in progress" };

// Work in progress: every page except the homepage shows a placeholder for now.
// The original page is kept below, commented out. To restore it, delete everything
// above the comment block and remove the comment markers.
export default function ProductPage() {
  return <WorkInProgress />;
}

/* ---- Original page (disabled) ----
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/lib/products";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.description } : {};
}

export default async function ProductPage({ params }: Params) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
---- end original page ---- */
