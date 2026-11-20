import Image from "next/image";
import type { Product } from "@/lib/products";
import { Bottle } from "./Bottle";

/** Product photo if one exists, otherwise the placeholder bottle illustration. */
export function ProductMedia({
  product,
  index = 0,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const src = product.images?.[index];
  if (src) {
    return <Image src={src} alt={product.name} fill sizes={sizes} priority={priority} className="media-img" />;
  }
  return (
    <div className="media-placeholder">
      <Bottle liquid={product.liquid} name={product.slug + index} set={product.family === "Set"} className="media-bottle" />
    </div>
  );
}
