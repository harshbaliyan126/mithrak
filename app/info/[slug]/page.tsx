import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Placeholder policy / info pages. Replace the copy with the client's real policies.
const pages: Record<string, { title: string; body: string[] }> = {
  "shipping-returns": {
    title: "Shipping & Returns",
    body: [
      "Orders are dispatched within 1–2 business days and delivered across India in 3–7 business days.",
      "Shipping is complimentary on orders over ₹2,999.",
      "Unopened products can be returned within 14 days of delivery. Write to us and we will arrange a pickup.",
    ],
  },
  faqs: {
    title: "FAQs",
    body: [
      "How long does a fragrance last? Our eaux de parfum are blended at 18–22% concentration and typically last 6–8 hours on skin.",
      "Can I try before I buy? Yes — The Discovery Set holds all eight scents, and its price is credited toward your first 50ml.",
    ],
  },
  "privacy-policy": { title: "Privacy Policy", body: ["Privacy policy copy goes here."] },
  terms: { title: "Terms of Service", body: ["Terms of service copy goes here."] },
  accessibility: { title: "Accessibility", body: ["We aim to meet WCAG 2.2 AA. Tell us if anything on this site is hard to use."] },
  stockists: { title: "Stockists", body: ["Stockist list goes here."] },
  ingredients: { title: "Ingredients", body: ["Ingredient philosophy copy goes here."] },
  contact: { title: "Contact", body: ["Email: hello@mithrak.com (placeholder)"] },
};

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = pages[(await params).slug];
  return p ? { title: p.title } : {};
}

export default async function InfoPage({ params }: Params) {
  const p = pages[(await params).slug];
  if (!p) notFound();
  return (
    <div className="text-page">
      <h1 className="serif-heading">{p.title}</h1>
      <section className="text-block">
        {p.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </section>
    </div>
  );
}
