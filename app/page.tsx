import Link from "next/link";
import { Campaign } from "@/components/Campaign";
import { HeroCarousel } from "@/components/HeroCarousel";
import { InstagramStories } from "@/components/InstagramStories";
import { ProductRail } from "@/components/ProductRail";
import { campaign, featuredSlugs, getProduct, getProducts, heroSlides } from "@/lib/products";
import { editorialLine } from "@/lib/site";

// Rebuild this page in the background every 6 hours so the Instagram grid stays current.
export const revalidate = 21600;

export default function Home() {
  const hero = heroSlides.flatMap((s) => {
    const product = getProduct(s.slug);
    return product ? [{ product, video: s.video, zoom: s.zoom, image: s.image }] : [];
  });
  const featured = getProducts(featuredSlugs);
  const campaignProduct = getProduct(campaign.slug)!;

  return (
    <>
      <HeroCarousel slides={hero} />

      <ProductRail products={featured} />

      <section className="editorial">
        <h2 className="serif-heading">{editorialLine}</h2>
        <Link href="/about" className="label arrow-link">
          Know more ▸
        </Link>
      </section>

      <Campaign product={campaignProduct} video={campaign.video} zoom={campaign.zoom} image={campaign.image} />

      <InstagramStories />
    </>
  );
}
