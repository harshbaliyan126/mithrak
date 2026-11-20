import type { Metadata } from "next";
import Link from "next/link";
import { FullLogo } from "@/components/Logo";

export const metadata: Metadata = { title: "About" };

// Placeholder brand story — replace with the client's copy.
const chapters = [
  {
    title: "A name that means a friend",
    body: "Mithrak comes from the old word for friend — the one who keeps you company in the dark. We make fragrances to be that kind of companion: close, honest and warm.",
  },
  {
    title: "Memory first, then the formula",
    body: "Every scent starts as a memory written in plain words: the first monsoon rain, a temple at dusk, a courtyard in May. Only then do we go looking for the ingredients that can tell it.",
  },
  {
    title: "Made slowly, in small batches",
    body: "We blend and macerate in small batches, using Indian saffron, sandalwood, vetiver and jasmine wherever we can, alongside the finest materials from around the world.",
  },
];

export default function About() {
  return (
    <div className="text-page">
      <FullLogo className="about-logo" />
      {chapters.map((c) => (
        <section key={c.title} className="text-block">
          <h2 className="serif-heading">{c.title}</h2>
          <p>{c.body}</p>
        </section>
      ))}
      <Link href="/shop" className="label arrow-link">
        Shop fragrances ▸
      </Link>
    </div>
  );
}
